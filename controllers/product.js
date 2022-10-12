import Product from "../schema/product.js";

export async function get(filter = {}) {
    try {
        return [200, await Product.find(filter)];
    }
    catch(err) {
        return (400, `error when getting products: ${err}`);
    }
}

export async function add(product) {
    try {
        await Product.create(product);
        return [200, "product added"];
    }
    catch (err) {
        return [400, `error when adding product: ${err}`];
    }
}

export async function update(id, newData) {
    try {
        await Product.findById(id).update(newData)
        return [200, "product updated"]
    }
    catch (err) {
        return [400, `error updating product: ${err}`];
    }
}

export async function remove(id) {
    try {
        Product.findByIdAndDelete(id)
        return [200, "product removed"]
    }
    catch (err) {
        return [400, `error removing product: ${err}`];
    }
}