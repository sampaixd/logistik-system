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
        }
    },
})

export default mongoose.model("Schedule", sheduleSchema)