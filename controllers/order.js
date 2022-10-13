import Order from "../schema/order.js";

export async function get(filter = {}) {
    try {
        return [200, await Order.find(filter)]
    }
    catch (err) {
        return [400, `error getting orders: ${err}`]
    }
}

export async function add(order) {
    try {
        return await Order.create(order)
        
    }
    catch (err) {
        return [400, `error adding order: ${err}`]
    }
}

export async function update(id, newData) {
    try {
        await Order.findById(id).update(newData)
        return [200, "order updated"]
    }
    catch (err) {
        return [400, `error updating order: ${err}`]
    }
}

export async function remove (id) {
    try{
        await Order.findByIdAndDelete(id)
        return [200, "order removed"]
    }
    catch(err) {
        return [400, `error deleting order: ${err}`]
    }
}