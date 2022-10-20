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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
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
        asignedShipment: {
            type: mongoose.Types.ObjectId,
            default: null
        }
    }
})

export default mongoose.model("Schedule", sheduleSchema)