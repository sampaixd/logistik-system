import order from "../schema/order.js";
import Order from "../schema/order.js";

export async function get() {
    try {
        return [200, await Order.find({})]
    }
    catch (err) {
        return [400, `error getting orders: ${err}`]
    }
}

export async function add(order) {
    try {
        await Order.create(order)
        return [200, "order added"]
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