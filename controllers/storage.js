import Storage from "../schema/storage.js";
import {add as shipmentDbAdd, get as shipmentDbGet} from "./shipment.js";

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
    await Storage.findOne({_id: id}).update(newData)
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
    catch(err) {
        return [400, `error removing storage: ${err}`];
    }
}

export async function addShipment(storage_id, newShipment) {
    
    let shipmentDbResponse = await shipmentDbAdd(newShipment);
    if (shipmentDbResponse[0] === 400) {
        return shipmentDbResponse
    }

    shipmentDbResponse = await shipmentDbGet(newShipment);
    if (shipmentDbResponse[0] === 400) {
        return shipmentDbResponse
    }
    const shipment_id = shipmentDbResponse[1][0]._id;
    return update(storage_id, {shipment_id: shipment_id})
}

//TODO add products, workers, shipments