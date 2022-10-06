import Storage from "../schema/storage.js";

export async function get() {
    try {
        return [200, await Storage.find({})]
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

//TODO add products, workers, shipments