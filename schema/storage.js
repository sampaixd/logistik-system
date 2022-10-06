
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
    products: {
        type: [{ 
            id: {
                type: mongoose.Types.ObjectId,
                required: [true, "product ID required"]
            },
            
            stock: {
                type: Number,
                required: [true, "stock required"],
                max: [1000000, "stock cannot exceed 1 000 000, please contact IT for help"]
            }
            }]
    },

    workers_id: {
        type: [mongoose.Types.ObjectId]
    }
})

export default mongoose.model("Storage", storageSchema)