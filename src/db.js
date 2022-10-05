import Customer from "../schema/customer";
import Order from "../schema/order";
import Product from "../schema/product";
import Schedule from "../schema/schedule";
import Shipment from "../schema/shipment";
import Storage from "../schema/storage";
import Trucker from "../schema/trucker";
import Worker from "../schema/worker";
import mongoose from "mongoose";



export async function storageAdd( storage ) {
    try {
        await Storage.create(storage);
        console.log("Storage added");
    }
    catch (err) {
        console.log(err);
    }
}
// add workers and schedule
export async function workerAdd(worker, schedule) {
    Schedule.create(schedule)
    .then((schedule) => {
        try
        {
        worker.add(worker + {schedule_id: schedule.id})
        console.log("worke r added");
        }
        catch(err) {
            console.log("error adding worker: " + err)
        }
    })
    .catch((err) => {
        console.log("error adding schedule: " + err);
    });
}

mongoose.connect("mongodb://localhost:27017/books")
    .then(() => {
        console.log("database connected");
    });