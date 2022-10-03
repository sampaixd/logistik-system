import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [50, "name cannot exceed 50 characters"]
    }
})

export default mongoose.model("Customer", customerSchema)