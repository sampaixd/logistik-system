import Order from "../schema/order.js";
import Shipment from "../schema/shipment.js";
import Product from "../schema/product.js";
import dayjs from "dayjs";

const shipmentStatus = {
    pending: "pending",
    packaged: "packaged",
    delivered: "delivered"
}

export async function get(filter = {}) {
    try {
        return await Shipment.find(filter);
    }
    catch (err) {
        return `error getting shipments: ${err}`;
    }
}

export async function add(shipment) {
    try {
        return await Shipment.create(shipment)
    }
    catch (err) {
        return `error adding shipment: ${err}`
    }
}

export async function update(id, newData) {
    try {
        await Shipment.findById(id).update(newData)
        return [200, "shipment updated"]
    }
    catch (err) {
        return [400, `error updating shipment: ${err}`]
    }
}

export async function remove(id) {
    try {
        await Shipment.findByIdAndDelete(id)
        return [200, "shipment removed"]
    }
    catch (err) {
        return [400, `error deleting shipment: ${err}`]
    }
}

export async function addOrder(shipmentId, orderId) {
    try {
        const shipment = await Shipment.findById(shipmentId);
        shipment.orders_id.push(orderId);
        shipment.save();
        return [200, "order added to shipment!"];
    } catch(err) {
        return [400, `error adding order to shipment: ${err}`];
    }
}


// unable to test this function at the moment
export async function getMontlySale(selectedMonth) {
    
    const thisMonthsShipments = await Shipment.find({
        shipping_date: {
            $gte: dayjs().month(selectedMonth).startOf("month"), 
            $lte: dayjs().month(selectedMonth).endOf("month")
        },
        status: shipmentStatus.delivered
    })
    console.log(`this months shipment: ${thisMonthsShipments}`)
    let totalSales = 0;


    let highestPrice = 0;
    let highestPriceShipment = []
    for (let i = 0; i < thisMonthsShipments.length; i++) {
        for (let x = 0; x < thisMonthsShipments[i].orders_id.length; x++) {
            const order = await Order.findById(thisMonthsShipments[i].orders_id[x]);
            const product = await Product.findById(order.product_id);
            const orderPrice = order.amount * product.price
            totalSales += orderPrice;
            if (orderPrice > highestPrice) {
                highestPrice = orderPrice;
                highestPriceShipment = [thisMonthsShipments[i]._id];
            } else if (orderPrice === highestPrice) {
                highestPriceShipment.push(thisMonthsShipments[i]._id);
            }

        }
    }

    return `Total sales: ${totalSales} - Most expensive order(s): ${highestPriceShipment.toString()} costing ${highestPrice} kr each`
}