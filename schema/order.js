import mongoose, { Schema } from "mongoose";
 
const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "customer required"]
    },

    order_date: {
        type: Date,
        default: Date.now
    },

    product_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "product required"]
    },

    amount: {
        type: Number,
        required: [true, "amount required"]
    }
})

export default mongoose.model("Order", orderSchema)