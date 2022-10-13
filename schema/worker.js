import mongoose, { Schema } from "mongoose";
import schedule from "./schedule.js";

const workerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [100, "name cannot exceed 100 characters"]
    },
    schedule: {
        type: schedule.schema,
        required: [true, "schedule required"]
    },
    storages_id: {
        type: [mongoose.Types.ObjectId]
    },
    shipments_id: {
        type: [mongoose.Types.ObjectId]
    }
})

export default mongoose.model("Worker", workerSchema)