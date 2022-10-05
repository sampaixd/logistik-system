import Storage from "../schema/storage.js";

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