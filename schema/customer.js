import mongoose, { mongo, Schema } from "mongoose";
import validator from "validator";
import crypt from "bcryptjs"

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        maxLength: [50, "name cannot exceed 50 characters"]
    },

    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already in use"],
        validate: { // TODO throws error of getting "undefined" without being called
            validator: validator.isEmail,
            message: "not a valid email address"
        }
    },

    password: {
        type: String,
        required: [true, "password required"],
        minLength: [8, "Password must be atleast 8 characters"],
        maxLength: [18, "password cannot exceed 18 characters"] // crypt.hash is limited to 18 characters
    },

    orders_id: {
        type: [mongoose.Types.ObjectId]
    }
})

customerSchema.pre("save", async function (next) {
    await crypt.hash(this.password, 10);
    next();
})

export default mongoose.model("Customer", customerSchema)