import { stringifyStyle } from "@vue/shared";
import mongoose, { Schema } from "mongoose";

const sheduleSchema = new mongoose.Schema({
    monday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    tuesday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    wednesday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    thursday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    friday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    saturday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
    sunday: {
        start: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        },
        end: {
            type: String,
            maxLength: [5, "Invalid time format"],
            minLength: [5, "Invalid time format"]
        }
    },
})

export default mongoose.model("Shedule", sheduleSchema)