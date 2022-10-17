import { stringifyStyle } from "@vue/shared";
import mongoose, { Schema } from "mongoose";

const sheduleSchema = new mongoose.Schema({
    monday: { 
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    tuesday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    wednesday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    thursday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    friday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    saturday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    },

    sunday: {
        start: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxlength: [5, "Invalid time format"],
            minlength: [5, "Invalid time format"]
        },
        asigned_Shipment: {
            type: mongoose.Types.ObjectId,
            default: undefined
        }
    }
})

export default mongoose.model("Schedule", sheduleSchema)