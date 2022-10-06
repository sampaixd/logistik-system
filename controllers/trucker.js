import Trucker from "../schema/trucker.js";

export async function get() {
    try {
        return [200, await Trucker.find({})]
    }
    catch (err) {
        return [400, `error getting truckers: ${err}`]
    }
}

export async function add(trucker, schedule) {
    
    try {
        await Trucker.create({ name: trucker.name, schedule: schedule})
        return [200, "trucker added"];
    }
    catch (err) {
        return [400, `error creating trucker: ${err}`];
    }
}

// newdata includes both the variable name as well as its value
export async function update(newData, id) {
    try {
        await Trucker.findOneById(id).update(newData);
        return [200, "trucker updated"];
    }
    catch (err) {
        return [400, `error updating trucker: ${err}`];
    }
}

export async function remove (id) {
    try {
        await Trucker.findByIdAndDelete(id);
        return [200, "trucker deleted"];
    }
    catch (err) {
        return [400, `error deleting trucker: ${err}`]
    }
}

//TODO asign shipment ID, asign location