import mongoose, { mongo, Schema } from "mongoose";

const shipmentSchema = mongoose.Schema({
    shipping_date: {
        type: Date,
        default: Date.now

    },
    orders_id: {
        type: [mongoose.Types.ObjectId],
        required: [true, "order(s) required"]
    },
    trucker_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "trucker required"],
        
    },
    workers_id: {
        type: [mongoose.Types.ObjectId],
        required: [true, "worker(s) required"]
    },
    delivered: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Shipment", shipmentSchema)