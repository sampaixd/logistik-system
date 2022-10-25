import * as shipmentDb from "../controllers/shipment.js";
import { Router } from "express";

const shipmentRouter = Router();

shipmentRouter.get("/get", async (req, res) => {
    const shipments = await shipmentDb.get();
    let statusCode = 0;
    if (typeof(shipment) === String) {
        statusCode = 400;
    } else {
        statusCode = 200;
    }
    res.status(statusCode).send(shipments);
})

shipmentRouter.get("/getMonthlySale", async (req, res) => {
    try {
       res.status(200).send(`total sales this month: ${await shipmentDb.getMontlySale(req.body.monthInt)}`);
    } catch(err) {
       res.status(400).send(`error getting total sales this month: ${err}`);
    }
})

shipmentRouter.put("/isDelivered", async (req, res) => {
    const dbResponse = await shipmentDb.update(req.body.shipmentId, {delivered: true});
    res.status(dbResponse[0]).send(dbResponse[1]);
})

shipmentRouter.get("/getUnsent", async (req, res) => {
    const dbResponse = await shipmentDb.get({delivered: false});
    let statusCode = 0;
    if (typeof(dbResponse) === String) {
        statusCode = 400;
    } else {
        statusCode = 200;
    }   
    res.status(statusCode).send(dbResponse);
})

export default shipmentRouter;