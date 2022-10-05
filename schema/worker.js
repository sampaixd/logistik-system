import mongoose, { Schema } from "mongoose";

const workerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [100, "name cannot exceed 100 characters"]
    },
    schedule_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "schedule required"]
    }
})

export default mongoose.model("Worker", workerSchema)