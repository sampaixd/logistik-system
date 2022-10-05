import express, { application } from "express";
import mongoose from "mongoose";
import workerRouter from "../routes/worker.js"

const app = express();
const port = 3002;

app.use(express.json());
app.use("/worker", workerRouter);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
})