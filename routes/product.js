import { Router } from "express";
import * as db from "../controllers/product.js"

const productRouter = Router();

productRouter.get("/get", async (req, res) => {
    const dbResponse = await db.get(req.body.product);
    res.status(dbResponse[0]).send(dbResponse[1])
})

productRouter.post("/add", async (req, res) => {
    const dbResponse = await db.add(req.body.product);
    res.status(dbResponse[0]).send(dbResponse[1])
})

productRouter.put("/update", async (req, res) => {
    const dbResponse = await db.update(req.body.id, req.body.newData)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

productRouter.delete("/delete", async (req, res) => {
    const dbResponse = await db.remove(req.body.id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

export default productRouter