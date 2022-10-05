import Worker from "../schema/worker.js";
import Schedule from "../schema/schedule.js";


// add workers and schedule
export async function add(worker, schedule) {
    let newSchedule = {}
    try {
        newSchedule = await Schedule.create(schedule)
    }
    catch (err) {
        return [400, `Error creating schudule: ${err}`]
    }

    try {
        await Worker.create({ name: worker.name, schedule_id: newSchedule.id })
    }
    catch (err) {
        Schedule.deleteOne({ _id: schedule._id })
        return [400, `error creating worker: ${err}`];
    }
    return [200, "worker added"];
}

// newdata includes both the variable name as well as its value
export async function update(newData, id) {
    try {
        await Worker.findOne({ _id: id }).updateOne(newData);
        return [200, "worker updated"];
    }
    catch (err) {
        return [400, `error when updating worker: ${err}`];
    }
}

export async function remove (id) {
    try {
        const worker = await Worker.findOne({ _id: id })

        await Schedule.deleteOne({ _id: worker.schedule_id });
        await Worker.deleteOne({ _id: id });
        return [200, "worker deleted"];
    }
    catch (err) {
        return [400, `error when deleting worker: ${err}`]
    }
}