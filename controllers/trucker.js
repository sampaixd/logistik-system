import Trucker from "../schema/trucker.js";
export async function get(filter = {}) {
    try {
        return [200, await Trucker.find(filter)]
    }
    catch (err) {
        return [400, `error getting truckers: ${err}`]
    }
}

export async function add(trucker, schedule) {

    try {
        await Trucker.create({ name: trucker.name, schedule: schedule })
        return [200, "trucker added"];
    }
    catch (err) {
        return [400, `error creating trucker: ${err}`];
    }
}

// newdata includes both the variable name as well as its value
export async function update(id, newData) {
    try {
        await Trucker.findOneById(id).update(newData);
        return [200, "trucker updated"];
    }
    catch (err) {
        return [400, `error updating trucker: ${err}`];
    }
}

export async function remove(id) {
    try {
        await Trucker.findByIdAndDelete(id);
        return [200, "trucker deleted"];
    }
    catch (err) {
        return [400, `error deleting trucker: ${err}`]
    }
}

export async function asignShipment(trucker_id, shipment_id) {
    return update(trucker_id, { shipment_id: shipment_id });
}

export async function clearShipment(trucker_id) {
    return update(trucker_id, { shipment_id: null });
}

export async function asignLocation(trucker_id, location) {
    return update(trucker_id, { location: location });
}

export async function clearLocation(trucker_id) {
    return update(trucker_id, { location: null })
}

export async function getAvailableTruckers(selectedDay) {
    try {
        return [200, await Trucker.find({ 
            [`schedule.${selectedDay}.asignedShipment`]: null,
            [`schedule.${selectedDay}.start`]: {$exists: true}  // does not work that day if it doesnt exist
     })];
    } catch(err) {
        return [400, `error finding avaiable truckers: ${err}`];
    }
}

//TODO asign shipment ID, asign location