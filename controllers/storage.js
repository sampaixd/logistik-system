import Storage from "../schema/storage.js";
import { add as shipmentDbCreate, get as shipmentDbGet, addOrder as addOrderToShipment } from "./shipment.js";
import * as workerDb from "./worker.js"
import * as truckerDb from "./trucker.js"
import { AvailableWorkerNotFoundError } from "../error/AvailableWorkerNotFoundError.js";
import { AvailableTruckerNotFoundError } from "../error/AvailableTruckerNotFoundError.js";
import { StorageError } from "../error/StorageError.js";
import { createObjectExpression } from "@vue/compiler-core";

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
    if (!suitableStorages.length) {
        return [400, "no storage with sufficient stock found"];
    }

    let shipmentId_SelectedStorageAndStaffId = []
    try {
        shipmentId_SelectedStorageAndStaffId = await getMostSuitableStorage(suitableStorages);
    } catch (err) {
        return [400, `error message: ${err.message}, stacktrace: ${err.stack}`];
    }
    const shipmentId = shipmentId_SelectedStorageAndStaffId[0];
    const selectedStorage = shipmentId_SelectedStorageAndStaffId[1];
    console.log(`shipment id and selected storage: ${shipmentId_SelectedStorageAndStaffId}`);

    if (shipmentId) {
        console.log("existing shipment found");
        return addOrderToShipment(shipmentId, orders._id);
    } 
    else {
        const worker_id = shipmentId_SelectedStorageAndStaffId[2][0];
        const trucker_id = shipmentId_SelectedStorageAndStaffId[2][1];
        //let ordersId = []
        //orders.foreach((order) => { ordersId.push(order.id) })
        const newShipment = await shipmentDbCreate({
            orders_id: orders._id,
            workers_id: worker_id,
            trucker_id: trucker_id,
            storage_id: selectedStorage.id
        });
        console.log(`new shipment id: ${newShipment}`)
        await addShipment(selectedStorage.id, newShipment._id)
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
                hasEnoughStock = product.stock >= orders.amount
            }
        })
        console.log("BALLS 2");
        return hasEnoughStock;
    })
}

async function getMostSuitableStorage(storages) {

    const suitableShipmentAndStorage = await lookForStorageWithExistingShipment(storages);

    // suitableShipmentAndStorage[0] will be empty string if no existing shipment was found
    console.log("suitable shipment and storage: " + suitableShipmentAndStorage);
    if (suitableShipmentAndStorage[0] !== "") {
        console.log("wee");
        return suitableShipmentAndStorage
    } else {
        try {
            return await findStorageWithSuitableWorkerAndTrucker(storages);
        } catch (err) {
            throw err;
        }
    }
}



async function lookForStorageWithExistingShipment(storages) {
    let mostSuitableStorage = storages[0];  // will default to the first storage
    let availableShipment_id = "";
    for (let i = 0; i < storages.length; i++) {
        console.log("test swag");
        if (availableShipment_id) { continue }
        if (storages[i].shipments_id.length) {
            console.log(`storage nr ${i} shipments id: ${storages[i].shipments_id}`);
            availableShipment_id = await lookForExistingShipment(storages[i].shipments_id);
            if (availableShipment_id) {
                console.log("wee 2");
                mostSuitableStorage = storages[i];
            }
        }
    }
    return [availableShipment_id, mostSuitableStorage]
}

async function lookForExistingShipment(shipments_id) {
    const currentDay = new Date().getDay();
    let availableShipment_id = "";
    console.log("swag");
    for (let i = 0; i < shipments_id.length; i++) {
        console.log("yolo");
        if (availableShipment_id) { continue }
        let shipment_id = shipments_id[i];
        const shipment = await shipmentDbGet({ _id: shipment_id })
        console.log(`shipment: ${shipment[0].shipping_date}`)
        // shipments are available to change 2 days prior to shipping
        console.log(`shipping date: ${shipment[0].shipping_date.getDay()}`);
        console.log(`current date: ${currentDay}`);
        console.log(`day int compare: ${(shipment[0].shipping_date.getDay() - 2) % 7 === currentDay}`);
        if ((shipment[0].shipping_date.getDay() - 2) % 7 === currentDay) {
            availableShipment_id = shipment_id;
            console.log("wee 3");
        }

    }
    return availableShipment_id;
}

async function findStorageWithSuitableWorkerAndTrucker(storages) {
    let availableWorkerAndTruckerId = [];
    let selectedStorage = "";
    for (let index = 0; index < storages.length; index++) {
        if (selectedStorage) { CSSConditionRule }
        try {
            availableWorkerAndTruckerId = await GetAvailableStaff(storages[index]);
            selectedStorage = storages[index];
        } catch (err) {
            //availableWorkerAndTruckerId = [];
            //selectedStorage = "BALLS";
            console.log(`error getting staff: ${err}`);
        }
    }
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


async function GetAvailableStaff(storage) {
    try {
        const worker_promise = findSuitableWorker(storage);
        const trucker_promise = findSuitableTrucker();
        return [await worker_promise, await trucker_promise];
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
async function findSuitableWorker(storage) {
    const packagingDay = getDayToString((new Date().getDay() + 1) % 7);
    let availableWorkerId = ""
    if (packagingDay === "error") {
        return "invalid asignment for weekday"
    }

    let promises = [];

    for (let index = 0; index < storage.workers_id.length; index++) {
        if (availableWorkerId) { continue }
        let worker_id = storage.workers_id[index];
        console.log(`${index} : ${worker_id}`)
        promises.push(workerDb.get({ _id: worker_id })
            .then((worker) => {
                if (worker[1][0].schedule[packagingDay].asignedShipment === null) {
                    availableWorkerId = worker[1][0]._id;
                }

            })
            .catch((err) => {
                throw new AvailableWorkerNotFoundError(`error finding suitable workers: ${err}`);
            }))

    }

    await Promise.all(promises)

    return availableWorkerId;

    //throw new AvailableWorkerNotFoundError("no available worker");    // this threw before program had time to return id
}
//returns trucker id
async function findSuitableTrucker() {
    let availableTruckerId = ""
    const shippingDay = getDayToString((new Date().getDay() + 2) % 7)
    try {
        const truckers = await truckerDb.get()
        truckers[1].forEach((trucker) => {
            if (availableTruckerId) { return }
            if (!trucker.schedule[shippingDay].asignedShipment) {
                availableTruckerId = trucker._id;
            }

        })
    }
    catch (err) {
        throw new AvailableTruckerNotFoundError(`error getting available trucker: ${err}`);
    }


    return availableTruckerId;

    //throw new AvailableTruckerNotFoundError("no available trucker")
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

async function addShipment(id, newShipmentId) {
    try {
        const storage = await Storage.findById(id);
        await storage.shipments_id.push(newShipmentId);
        storage.save();
        console.log("pushed shipment to storage");
    } catch (err) {
        console.error(`error occured adding shipment to storage: ${err}`);
    }
}

export async function findAllStoragesWithProductInStock(productId) {
    try {
        const storages = await Storage.find({
        "products.id": productId,
        "products.stock": {
            $gte: 1
        }
    });
    return [200, await formatStoragesWithStock(storages, productId)];
    } catch(err) {
        return [400, `error getting storages with product in stock: ${err}`];
    }
}

async function formatStoragesWithStock(storages, productId) {
    let formattedStorages = []
    storages.forEach((storage) => {
        let product = -1;
        console.log("storage prod len: " + storage.products.length)
        for (let i = 0; i < storage.products.length; i++) {
            console.log("test");
            console.log(`product id comp in format: ${storage.products[i].id.equals(productId)}`)
            if (storage.products[i].id.equals(productId)) {   // finds the correct product from all products
                product = i;
                break;
            }
        }
        
        formattedStorages.push(`Storage id: ${storage._id} - product stock: ${storage.products[product].stock}`);
    })
    return formattedStorages;
}

export async function addProduct(storageId, productId, stock) {
    const storage = await storage.findById(storageId);
   // CONTINUE HERE 
}
//TODO add products, workers, shipments