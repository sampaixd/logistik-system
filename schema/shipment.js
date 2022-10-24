import mongoose, { mongo, Schema } from "mongoose";
import dayjs from "dayjs";
const shipmentSchema = mongoose.Schema({
    shipping_date: {
        type: Date,
        default: dayjs().add(2, "day")

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
    },
    storage_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "storage ID required"]
    }
})

export default mongoose.model("Shipment", shipmentSchema)