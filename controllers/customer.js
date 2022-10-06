import Customer from "../schema/customer.js";

export async function get() {
    try {
        return [200, await Customer.find({})]
    }
    catch (err) {
        return [400, `error getting customers: ${err}`]
    }
}

export async function add(customer) {
    
    try {
        await Customer.create(customer)
        return [200, "customer added"];
    }
    catch (err) {
        return [400, `error creating customer: ${err}`];
    }
}

// newdata includes both the variable name as well as its value
export async function update(newData, id) {
    try {
        await Customer.findOneById(id).update(newData);
        return [200, "customer updated"];
    }
    catch (err) {
        return [400, `error updating customer: ${err}`];
    }
}

export async function remove (id) {
    try {
        await Customer.findByIdAndDelete(id);
        return [200, "customer deleted"];
    }
    catch (err) {
        return [400, `error deleting customer: ${err}`]
    }
}