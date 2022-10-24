import * as shipmentDb from "../controllers/shipment.js";
import { Router } from "express";

const shipmentRouter = Router();

shipmentRouter.get("/getMonthlySale", async (req, res) => {
    try {
       res.status(200).send(`total sales this month: ${await shipmentDb.getMontlySale(req.body.monthInt)}`);
    } catch(err) {
       res.status(400).send(`error getting total sales this month: ${err}`);
    }
})

shipmentRouter.put("/isDelivered", async (req, res) => {
    const dbResponse = shipmentDb.update(req.body.shipmentId, {delivered: true});
    res.status(dbResponse[0]).send(dbResponse[1]);
})

export default shipmentRouter;