import {Router} from "express";
import * as db from "../controllers/storage.js";

const storageRouter = Router();

storageRouter.post("/add", async (req, res) => {
    const dbResponse = await db.add(req.body.storage);
    res.status(dbResponse[0]).send(dbResponse[1])
})

export default storageRouter;