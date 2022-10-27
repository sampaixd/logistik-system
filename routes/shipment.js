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

shipmentRouter.put("/update", async (req, res) => {
    const dbResponse = await shipmentDb.update(req.body.id, req.body.newData)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

shipmentRouter.get("/getMonthlySale", async (req, res) => {
    try {
       res.status(200).send(await shipmentDb.getMontlySale(req.body.monthInt));
    } catch(err) {
       res.status(400).send(`error getting total sales this month: ${err}`);
    }
})

shipmentRouter.put("/setStatus", async (req, res) => {
    if (req.body.status !== "pending" && req.body.status !== "packaged" && req.body.status !== "delivered") {
        res.status(400).send("invalid status");
        return;
    }
    const dbResponse = await shipmentDb.update(req.body.shipmentId, {status: req.body.status});
    res.status(dbResponse[0]).send(dbResponse[1]);
})

shipmentRouter.get("/getPending", async (req, res) => {
    const dbResponse = await shipmentDb.get({status: "pending"});
    let statusCode = 0;
    if (typeof(dbResponse) === String) {
        statusCode = 400;
    } else {
        statusCode = 200;
    }   
    res.status(statusCode).send(dbResponse);
})

shipmentRouter.get("/getPackaged", async (req, res) => {
    const dbResponse = await shipmentDb.get({status: "packaged"});
    let statusCode = 0;

    if (typeof(dbResponse) === String) {
        statusCode = 400;
    } else {
        statusCode = 200;
        dbResponse.sort((a, b) => { return a.shipping_date - b.shipping_date; })
    }   
    res.status(statusCode).send(dbResponse);
})


export default shipmentRouter;