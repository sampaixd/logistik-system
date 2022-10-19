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
    let suitableStorages = await Storage.find({
        "products.id": orders.product_id,
    });
    if (!suitableStorages.length) {
        return [400, "Storage error! Could not find storage with product avalible"]
    }
    suitableStorages = getAllStoragesWithSufficientStock(suitableStorages, orders);
    let shipmentId_SelectedStorageAndStaffId = []
    try {
        shipmentId_SelectedStorageAndStaffId = await getMostSuitableStorage(suitableStorages);
    } catch (err) {
        return [400, err.message];
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
    }
}


function getAllStoragesWithSufficientStock(storages, orders) {
    return storages.filter((storage) => {

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
        console.log("BALLS 2");
        return hasEnoughStock;
    })
}

async function getMostSuitableStorage(storages) {

    const suitableShipmentAndStorage = lookForStorageWithExistingShipment(storages);

    // suitableShipmentAndStorage[0] will be empty string if no existing shipment was found
    if (suitableShipmentAndStorage[0]) {
        return suitableShipmentAndStorage
    } else {
        try {
            return await findStorageWithSuitableWorkerAndTrucker(storages);
        } catch (err) {
            throw err;
        }
    }
}



function lookForStorageWithExistingShipment(storages) {
    let mostSuitableStorage = storages[0];  // will default to the first storage
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
    return [availableShipment_id, mostSuitableStorage]
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

function findStorageWithSuitableWorkerAndTrucker(storages) {
    let availableWorkerAndTruckerId = [];
    let selectedStorage = "";
    storages.forEach((storage) => {
        if (selectedStorage) { return }
        try {
            availableWorkerAndTruckerId = GetAvailableStaff(storage);
            selectedStorage = storage;
        } catch (err) {
            //availableWorkerAndTruckerId = [];
            //selectedStorage = "BALLS";
            console.log(`error getting staff: ${err}`);
        }
    });
    console.log(`worker and trucker id: ${availableWorkerAndTruckerId}`)
    if (!availableWorkerAndTruckerId[0] && !availableWorkerAndTruckerId[1]) {
        throw new StorageError("Storage error! Could not find worker or trucker");
    } else if (!availableWorkerAndTruckerId[0]) {
        throw new StorageError("Storage error! Could not find worker");
    } else if (!availableWorkerAndTruckerId[1]) {
        throw new StorageError("Storage error! Could not find trucker");
    } else {
        return [false, selectedStorage, availableWorkerAndTruckerId];
    }
}


function GetAvailableStaff(storage) {
    try {
        const worker_id = findSuitableWorker(storage);
        const trucker_id = findSuitableTrucker();
        return [worker_id, trucker_id];
    } catch (err) {
        console.log(err);
        switch (err.type) {
            case "AvailableWorkerNotFoundError":
                throw new StorageError(`Storage error: ${err}`);
            case "AvailableTruckerNotFoundError":
                throw new StorageError(`Storage error: ${err}`);
            default:
                throw new StorageError(`Unknown storage error: ${err}`);
        }
    }
}
// returns worker id
function findSuitableWorker(storage) {
    const packagingDay = getDayToString((new Date().getDay() + 1) % 7);
    let availableWorker_id = ""
    if (packagingDay === "error") {
        return "invalid asignment for weekday"
    }
    console.log(`all workers: ${storage.workers_id}`);
    storage.workers_id.forEach((worker_id, index) => {
        if (availableWorker_id) { return }
        console.log(`${index} : ${worker_id}`)
        workerDb.get({ _id: worker_id })
            .then((worker) => {
                console.log(worker[1]);
                if (typeof (worker[1][0]["schedule"][packagingDay]["asigned_Shipment"]) == undefined) {
                    availableWorker_id = worker._id;
                }
            })
            .catch((err) => {
                throw new AvailableWorkerNotFoundError(`error finding suitable workers: ${err}`);
            })
    })
    console.log("test 2");
    if (availableWorker_id) {
        return availableWorker_id;
    }
    throw new AvailableWorkerNotFoundError("no available worker");
}
//returns trucker id
function findSuitableTrucker() {
    let availableTrucker_id = ""
    const shippingDay = getDayToString((new Date().getDay() + 2) % 7)
    truckerDb.get()
        .then((truckers) => {
            truckers.forEach((trucker) => {
                if (availableTrucker_id) { return }

                if (typeof (trucker.schedule.shippingDay.asigned_Shipment) == undefined) {
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
    throw new AvailableTruckerNotFoundError("no available trucker")
}

function getDayToString(dayInt) {
    switch (dayInt) {
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
            console.log("BALLS");
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