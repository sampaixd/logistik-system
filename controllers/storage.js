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

export async function createShipment(storage_id, newShipment) {
    
    let shipmentDbResponse = await shipmentDbCreate(newShipment);
    if (shipmentDbResponse[0] === 400) {
        return shipmentDbResponse
    }
    
}

export async function asignWorker(storage_id, worker_id) {
    try {
        const storage = await Storage.findById(storage_id)
        await storage.workers_id.push(worker_id);
        storage.save();
        return [200, "worker assigned to storage"]
    }
    catch(err) {
        return [400, `error assigning worker to storage: ${err}`]
    }
}

export async function relieveWorker(storage_id, worker_id) {
    try {
        const storage = await Storage.findById(storage_id);
        storage.workers_id.pull({_id: worker_id});
        storage.save();
        return [200, "worker relieved from storage"];
    }
    catch(err) {
        return [400, `error relieving worker: ${err}`]
    }
}

export async function updateShipment(shipment_id, newOrder) {
    
}
//TODO add products, workers, shipments