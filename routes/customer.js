import { Router } from "express";
import * as customerDb from "../controllers/customer.js";
import * as orderDb from "../controllers/order.js";

const customerRouter = Router();

customerRouter.get("/get", async (req, res) => {
    const dbResponse = await customerDb.get(req.body.customer);
    res.status(dbResponse[0]).send(dbResponse[1])
})

customerRouter.post("/add", async (req, res) => {
    const dbResponse = await customerDb.add(req.body.customer);
    res.status(dbResponse[0]).send(dbResponse[1])
})

customerRouter.put("/update", async (req, res) => {
    const dbResponse = await customerDb.update(req.body.id, req.body.newData)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.delete("/delete", async (req, res) => {
    const dbResponse = await customerDb.remove(req.body.id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.get("/getOrders", async (req, res) => {
    const dbResponse = await orderDb.get({customer_id: req.body.customer_id})
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.post("/placeOrder", async (req, res) => {
    const dbResponse = await orderDb.add(req.body.order)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.put("/updateOrder", async (req, res) => {
    const dbResponse = await orderDb.update(req.body.order_id, req.body.newData);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.delete("/removeOrder", async (req, res) => {
    const dbResponse = await orderDb.remove(req.body.order_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})



export default customerRouter;