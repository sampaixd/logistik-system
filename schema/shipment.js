import mongoose, { mongo, Schema } from "mongoose";

const shipmentSchema = mongoose.Schema({
    date: {
        type: date,
        required: [true, "date required"],

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
    }
})

export default mongoose.model("Shipment", shipmentSchema)