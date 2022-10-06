import Shipment from "../schema/shipment.js";

export async function get() {
    try {
        return [200, await Shipment.find({})]
    }
    catch (err) {
        return [400, `error getting shipments: ${err}`]
    }
}

export async function add(shipment) {
    try {
        await Shipment.create(shipment)
        return [200, "shipment added"]
    }
    catch (err) {
        return [400, `error adding shipment: ${err}`]
    }
}

export async function update(id, newData) {
    try {
        await Shipment.findById(id).update(newData)
        return [200, "shipment updated"]
    }
    catch (err) {
        return [400, `error updating shipment: ${err}`]
    }
}

export async function remove (id) {
    try{
        await Shipment.findByIdAndDelete(id)
        return [200, "shipment removed"]
    }
    catch(err) {
        return [400, `error deleting shipment: ${err}`]
    }
}