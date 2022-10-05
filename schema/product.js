import mongoose, { mongo, Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [200, "product name cannot exceed 200 characters"]
    },
    price: {
        type: Number,
        required: [true, "price required"],
        max: [1000000, "Price cannot exceed 1 000 000 kr, please contact IT for help"]
    },
    stock: {
        type: Number,
        required: [true, "stock required"],
        max: [1000000, "stock cannot exceed 1 000 000, please contact IT for help"]
    },

    shelf_number: {
        type: String,
        required: [true, "shelf number required"],
        maxLength: [20, "shelf number cannot exceed 20 characters, please contact IT for help"]
    }
})

export default mongoose.model("Product", productSchema);