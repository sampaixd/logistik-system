
import mongoose, { Schema } from "mongoose";
const storageSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "location required"],
        maxLength: [50, "location is max 50 characters"]
    },
    shipments_id: {
        type: [mongoose.Types.ObjectId]
    },
    products_id: {
        type: [mongoose.Types.ObjectId]
    },

    workers_id: {
        type: [mongoose.Types.ObjectId]
    }
})

export default mongoose.model("Storage", storageSchema)