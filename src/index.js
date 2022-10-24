import express, { application } from "express";
import mongoose from "mongoose";
import workerRouter from "../routes/worker.js"
import storageRouter from "../routes/storage.js";
import productRouter from "../routes/product.js";
import customerRouter from "../routes/customer.js";
import customer from "../schema/customer.js";
import truckerRouter from "../routes/trucker.js";
import shipmentRouter from "../routes/shipment.js"

const app = express();
const port = 3012;

app.use(express.json());
app.use("/worker", workerRouter);
app.use("/trucker", truckerRouter);
app.use("/storage", storageRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);
app.use("/shipment", shipmentRouter);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
})

mongoose.connect("mongodb://localhost:27017/logistik-system")
    .then(() => {
        console.log("database connected");
    });