import order from "../schema/order.js";
import Shipment from "../schema/shipment.js";

export async function get(filter = {}) {
    try {
        return [200, await Shipment.find(filter)]
    }
    catch (err) {
        return [400, `error getting shipments: ${err}`]
    }
}

export async function add(shipment) {
    try {
        await Shipment.create(shipment)
        return [200, "shipment added"]
    }
    catch (err) {
        return [400, `error adding shipment: ${err}`]
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

export async function remove (id) {
    try{
        await Shipment.findByIdAndDelete(id)
        return [200, "shipment removed"]
    }
    catch(err) {
        return [400, `error deleting shipment: ${err}`]
    }
}


// unable to test this function at the moment
export async function getMontlySale(startOfMonth, endOfMonth) {
    const thisMonthsShipments = await Shipment.find({ 
        shipment_date: {
            $gte: startOfMonth,
            $lte: endOfMonth
    }});
    
    let totalSales = 0;
    
    thisMonthsShipments.forEach((shipment) => {
        shipment.orders_id.forEach((order_id) =>{
            order.findById(order_id)
            .then((order) => {
                totalSales += order.price * order.amount;
            })
        })
    })

    return totalSales
}