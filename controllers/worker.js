import Worker from "../schema/worker.js";
import Schedule from "../schema/schedule.js";

export async function get(filter = {}) {
    try {
        return [200, await Worker.find(filter)]
    }
    catch (err) {
        return [400, `error getting workers: ${err}`]
    }
}

export async function add(worker, schedule) {
    
    try {
        await Worker.create({ name: worker.name, schedule: schedule})
        return [200, "worker added"];
    }
    catch (err) {
        return [400, `error creating worker: ${err}`];
    }
}

// newdata includes both the variable name as well as its value
export async function update(id, newData) {
    try {
        await Worker.findById(id).update(newData);
        return [200, "worker updated"];
    }
    catch (err) {
        return [400, `error updating worker: ${err}`];
    }
}

export async function remove (id) {
    try {
        await Worker.findByIdAndDelete(id);
        return [200, "worker deleted"];
    }
    catch (err) {
        return [400, `error deleting worker: ${err}`]
    }
}

export async function getAvailableWorkers(selectedDay) {
    try {
        return [200, await Worker.find({ 
            [`schedule.${selectedDay}.asignedShipment`]: null,
            [`schedule.${selectedDay}.start`]: {$exists: true}  // does not work that day if it doesnt exist
     })];
    } catch(err) {
        return [400, `error finding avaiable workers: ${err}`];
    }
}