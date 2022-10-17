import Storage from "../schema/storage.js";
import { add as shipmentDbCreate, get as shipmentDbGet } from "./shipment.js";

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
    

    if (suitableStorages.length) {
        //let ordersId = []
        //orders.foreach((order) => { ordersId.push(order.id) })
        shipmentDbCreate({
            orders_id: orders._id,
            workers_id: suitableStorages[0].workers_id[0],
            trucker_id: "63480375455c8e9b80517d30",
            storage_id: suitableStorages[0].id
        })
        return [200, "order added!"]
    } else {
        if (!errorMessage.length) {
            errorMessage = "no storage with sufficient stock avalible"
        }
        return [400, errorMessage]
    }



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