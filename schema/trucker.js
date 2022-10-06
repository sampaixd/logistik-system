import { stringifyStyle } from "@vue/shared";
import mongoose, { mongo, Schema } from "mongoose";
import schedule from "./schedule.js";

const truckerSchema = new mongoose.Schema({
    location: {
        type: String,
        maxLength: [100, "location cannot exceed 100 characters"]
    },

    shipment_id: {
        type: mongoose.Types.ObjectId
    },

    schedule: {
        type: schedule.schema,
        requred: [true, "schedule required"]
    },

    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [100, "name cannot exceed 100 characters"]
    }
})

export default mongoose.model("Trucker", truckerSchema)