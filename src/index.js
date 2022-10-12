import express, { application } from "express";
import mongoose from "mongoose";
import workerRouter from "../routes/worker.js"
import storageRouter from "../routes/storage.js";
import productRouter from "../routes/product.js";
import customerRouter from "../routes/customer.js";
import customer from "../schema/customer.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/worker", workerRouter);
app.use("/storage", storageRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
})

mongoose.connect("mongodb://localhost:27017/logistik-system")
    .then(() => {
        console.log("database connected");
    });