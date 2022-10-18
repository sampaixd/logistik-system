import Storage from "../schema/storage.js";
import { add as shipmentDbCreate, get as shipmentDbGet } from "./shipment.js";
import * as workerDb from "./worker.js"
import * as truckerDb from "./trucker.js"
import { AvailableWorkerNotFoundError } from "../error/AvailableWorkerNotFoundError.js";
import { AvailableTruckerNotFoundError } from "../error/AvailableTruckerNotFoundError.js";
import { StorageError } from "../error/StorageError.js";

export async function get(filter = {}) {
    try {
        return [200, await Storage.find(filter)]
    }
    catch (err) {
        return [400, `error getting storages: ${err}`]
    }
}

export async function add(storage) {
    try {
        await Storage.create(storage)
        return [200, "Storage added"];
    }
    catch (err) {
        return [400, `error adding storage: ${err}`];
    }
}

export async function update(id, newData) {
    try {
        await Storage.findById(id).update(newData)
        return [200, "storage updated"]
    }
    catch (err) {
        return [400, `error when updating storage: ${err}`]
    }
}

export async function remove(id) {
    try {
        await Storage.findByIdAndDelete(id);
        return [200, "storage removed"];
    }
    catch (err) {
        return [400, `error removing storage: ${err}`];
    }
}

export async function createShipment(orders) {
    let errorMessage = "";
    let suitableStorages = await Storage.find({
        "products.id": orders.product_id,
    });
    if (!suitableStorages.length) {
        errorMessage = "could not find storage with product avalible"
    }
    console.log(suitableStorages);
    suitableStorages = getAllStoragesWithSufficientStock(suitableStorages, orders);
    let shipmentId_SelectedStorageAndStaffId = []
    try {
        shipmentId_SelectedStorageAndStaffId = getMostSuitableStorage(suitableStorages);
    } catch(err) {
        return [400, err];
    }
    const shipmentId = shipmentId_SelectedStorageAndStaffId[0];
    const selectedStorage = shipmentId_SelectedStorageAndStaffId[1];

    if (shipmentId) {
        // update existing shipment
    } else {
        const worker_id = shipmentId_SelectedStorageAndStaffId[2][0];
        const trucker_id = shipmentId_SelectedStorageAndStaffId[2][1];
        //let ordersId = []
        //orders.foreach((order) => { ordersId.push(order.id) })
        shipmentDbCreate({
            orders_id: orders._id,
            workers_id: worker_id,
            trucker_id: trucker_id,
            storage_id: selectedStorage.id
        })
        return [200, "order added!"]
    } /*else {
        if (!errorMessage.length) {
            errorMessage = "no storage with sufficient stock avalible"
        }
        return [400, errorMessage]*/
}


function getAllStoragesWithSufficientStock(storages, order) {
    return suitableStorages.filter((storage) => {

        let hasEnoughStock = false;
        storage.products.forEach((product) => {
            if (hasEnoughStock) { return }
            // if the current product is the product searched for,
            //asign the product to currentProduct and continue in if statement
            if (orders.product_id.equals(product.id)) {
                console.log(`sufficient stock: ${product.stock >= orders.amount}`)
                hasEnoughStock = product.stock >= orders.amount ? true : false;
            }
        })
        console.log(hasEnoughStock);
        return hasEnoughStock;
    })
}

function getMostSuitableStorage(storages) {

    mostSuitableStorage = storages[0];  // will default to the first storage
    let availableShipment_id = "";
    storages.forEach((storage, index) => {
        if (availableShipment_id) { return }
        if (storage.shipments_id.length) {
            availableShipment_id = lookForExistingShipment(storage.shipments_id);
            if (availableShipment_id) {
                mostSuitableStorage = storages[index];
            }
        }
    })
    // first return parameter tells the program if it found an existing shipment
    if (availableShipment_id) {
        return [availableShipment_id, mostSuitableStorage]
    } else {
        let availableWorkerAndTruckerId = [];
        let selectedStorage = "";
        storages.forEach((storage) => {
            if (selectedStorage) { return }
            try {
                availableWorkerAndTruckerId = GetAvailableStaff(storage);
                selectedStorage = storage;
            } catch (err) {
                availableWorkerAndTruckerId = [];
                selectedStorage = "";
            }

            if (availableWorkerAndTruckerId) {
                return [false, selectedStorage, availableWorkerAndTruckerId];
            }


        })
    }

}

function lookForExistingShipment(shipments_id) {
    const currentDay = new Date().getDay();
    let availableShipment_id;
    shipments_id.forEach((shipment_id) => {
        if (availableShipment_id) { return }
        shipmentDbGet({ _id: shipment_id })
            .then((shipment) => {
                // shipments are available to change 2 days prior to shipping
                if ((shipment.shippingDay.toDay() - 2) % 7 === currentDay) {
                    availableShipment_id = shipment_id;
                }
            })
    })
}

function GetAvailableStaff(storage) {
    try {

    } catch (err) {
        switch (typeof (err)) {
            case "AvailableWorkerNotFoundError":
                throw new StorageError(`Storage error: ${err}`);
            case "AvailableTruckerNotFoundError":
                throw new StorageError(`Storage error: ${err}`);
            default:
                throw new StorageError(`Unknown storage error: ${err}`);
        }
    }
}

function findSuitableWorker(storage) {
    const packagingDay = getDayToString((new Date().getDay() + 1) % 7);
    let availableWorker_id = ""
    if (packagingDay === "error") {
        return "invalid asignment for weekday"
    }
    storage.workers_id.forEach((worker_id) => {
        if (!availableWorker_id) { return }

        workerDb.get({ _id: worker_id })
            .then((worker) => {
                if (typeof (worker.schedule[packagingDay].asigned_Shipment) == undefined) {
                    availableWorker_id = worker._id;
                }
            })
            .catch((err) => {
                throw new AvailableWorkerNotFoundError(`error finding suitable workers: ${err}`);
            })
    })
    if (availableWorker_id) {
        return availableWorker_id;
    }
    throw new AvailableWorkerNotFoundError("unable to find available worker");
}

function findSuitableTrucker() {
    let availableTrucker_id = ""
    const shippingDay = getDayToString((new Date().getDay() + 2) % 7)
    truckerDb.get()
        .then((truckers) => {
            truckers.forEach((trucker) => {
                if (availableTrucker_id) { return }

                if (typeof (trucker.schedule[shippingDay].asigned_Shipment) == undefined) {
                    availableTrucker_id = trucker._id;
                }
            })
        })
        .catch((err) => {
            throw new AvailableTruckerNotFoundError(`error getting available trucker: ${err}`);
            return "";
        })
    if (availableTrucker_id) {
        return availableTrucker_id;
    }
    throw new AvailableTruckerNotFoundError("could not find available trucker")
}

function getDayToString(dayInt) {
    switch (packagingDay) {
        case 0:
            return "monday";
        case 1:
            return "tuesday";
        case 2:
            return "wednesday";
        case 3:
            return "thursday";
        case 4:
            return "friday";
        case 5:
            return "saturday";
        case 6:
            return "sunday";
        default:
            console.log("invalid day format, number must be between 0-6");
            return "error";
    }

}

export async function asignWorker(storage_id, worker_id) {
    try {
        const storage = await Storage.findById(storage_id)
        await storage.workers_id.push(worker_id);
        storage.save();
        return [200, "worker assigned to storage"]
    }
    catch (err) {
        return [400, `error assigning worker to storage: ${err}`]
    }
}

export async function relieveWorker(storage_id, worker_id) {
    try {
        const storage = await Storage.findById(storage_id);
        storage.workers_id.pull({ _id: worker_id });
        storage.save();
        return [200, "worker relieved from storage"];
    }
    catch (err) {
        return [400, `error relieving worker: ${err}`]
    }
}

export async function updateShipment(shipment_id, newOrder) {

}
//TODO add products, workers, shipments