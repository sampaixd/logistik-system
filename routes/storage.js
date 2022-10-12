import { Router } from "express";
import * as db from "../controllers/storage.js";
import storage from "../schema/storage.js";

const storageRouter = Router();

storageRouter.get("/get", async (req, res) => {
    const dbResponse = await db.get(req.body.storage);
    res.status(dbResponse[0]).send(dbResponse[1])
})

storageRouter.post("/add", async (req, res) => {
    const dbResponse = await db.add(req.body.storage);
    res.status(dbResponse[0]).send(dbResponse[1])
})

storageRouter.put("/update", async (req, res) => {
    const dbResponse = await db.update(req.body.id, req.body.newData)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.delete("/delete", async (req, res) => {
    const dbResponse = await db.remove(req.body.id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.put("/asignWorker", async (req, res) => {
    const dbResponse = await db.asignWorker(req.body.storage_id, req.body.worker_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.put("/relieveWorker", async (req, res) => {
    const dbResponse = await db.relieveWorker(req.body.storage_id, req.body.worker_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

// TODO work on this when all basic routes are added
storageRouter.post("/addShipment", async (req, res) => {
    const dbResponse = await db.createShipment(req.body.shipment)
})

export default storageRouter;