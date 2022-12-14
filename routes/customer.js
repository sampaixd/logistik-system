import { Router } from "express";
import * as customerDb from "../controllers/customer.js";
import * as orderDb from "../controllers/order.js";
import { createShipment } from "../controllers/storage.js";

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

customerRouter.get("/order/get", async (req, res) => {
    const dbResponse = await orderDb.get({customer_id: req.body.customer_id})
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.post("/order/place", async (req, res) => {
    const order = await orderDb.add(req.body.order)
    const dbResponse = await createShipment(order);
    if (dbResponse[0] === 400) {
        orderDb.remove(order);
    }
    res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.put("/order/update", async (req, res) => {
    const dbResponse = await orderDb.update(req.body.order_id, req.body.newData);
   res.status(dbResponse[0]).send(dbResponse[1]);
})

customerRouter.delete("/order/delete", async (req, res) => {
    const dbResponse = await orderDb.remove(req.body.order_id);
    res.status(dbResponse[0]).send(dbResponse[1]);
})



export default customerRouter;