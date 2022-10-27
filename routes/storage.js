import { Router } from "express";
import * as storageDb from "../controllers/storage.js";
import storage from "../schema/storage.js";

const storageRouter = Router();

storageRouter.get("/get", async (req, res) => {
    const dbResponse = await storageDb.get(req.body.storage);
    res.status(dbResponse[0]).send(dbResponse[1])
})

storageRouter.post("/add", async (req, res) => {
    const dbResponse = await storageDb.add(req.body.storage);
    res.status(dbResponse[0]).send(dbResponse[1])
})

storageRouter.put("/update", async (req, res) => {
    const dbResponse = await storageDb.update(req.body.id, req.body.newData)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.delete("/delete", async (req, res) => {
    const dbResponse = await storageDb.remove(req.body.id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.put("/worker/asign", async (req, res) => {
    const dbResponse = await storageDb.asignWorker(req.body.storage_id, req.body.worker_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.put("/worker/relieve", async (req, res) => {
    const dbResponse = await storageDb.relieveWorker(req.body.storage_id, req.body.worker_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.post("/product/add", async (req, res) => {
    const dbResponse = await storageDb.addProduct(req.body.storageId, req.body.productId, req.body.stock);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

storageRouter.put("/product/stock/add", async (req, res) => {
    const dbResponse = await storageDb.addStockToProduct(req.body.storageId, req.body.productId, req.body.additionalStock)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

export default storageRouter;