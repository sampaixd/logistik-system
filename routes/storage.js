import {Router} from "express";
import * as db from "../controllers/storage.js";
import storage from "../schema/storage.js";

const storageRouter = Router();

storageRouter.get("/get", async(req, res) => {
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

storageRouter.post("/addSchedule", async (req, res) => {
    
})

export default storageRouter;