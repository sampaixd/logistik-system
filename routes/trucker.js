import {router} from "express"
import * as db from "../controllers/trucker.js"

const truckerRouter = Router();

truckerRouter.get("/get", async (req, res) => {
    const dbResponse = await db.get();
    res.status(dbResponse[0]).send(dbResponse[1]);
})

truckerRouter.post("/add", async (req, res) => {
    try {
        validateTime(req.body.schedule.monday, "monday");
        validateTime(req.body.schedule.tuesday, "tuesday");
        validateTime(req.body.schedule.wednesday, "wednesday");
        validateTime(req.body.schedule.thursday, "thursday");
        validateTime(req.body.schedule.friday, "friday");
        validateTime(req.body.schedule.saturday, "saturday");
        validateTime(req.body.schedule.sunday, "sunday");
        const dbResponse = await db.add(req.body.worker, req.body.schedule)
        console.log(dbResponse);
        res.status(dbResponse[0]).send(dbResponse[1]);
    }
    catch (err) {
        switch (err.name) {
            case "SyntaxError":
                res.status(400).send(`Invalid time for schedule. ${err.message}`);
            default:
                res.status(400).send(`unknown error: ${err.message}`);
        }
    }


});

function validateTime(day, dayName) {
    if (day == undefined) {
        return;
    }
    let start = day.start.split(":");
    let end = day.end.split(":");
    start[0] = parseInt(start[0]);
    start[1] = parseInt(start[1]);
    end[0] = parseInt(end[0]);
    end[1] = parseInt(end[1]);

    if (0 > start[0] || start[0] > 23) {
        throw new SyntaxError(`${dayName}: invalid time for hours on start time`);
    }
    else if (0 > start[1] || start[1] > 59) {
        throw new SyntaxError(`${dayName}: invalid time for minutes on start time`);
    }
    else if (0 > end[0] || end[0] > 23) {
        throw new SyntaxError(`${dayName}: invalid time for hours on end time`);
    }
    else if (0 > end[1] || end[1] > 59) {
        throw new SyntaxError(`${dayName}: invalid time for minutes on end time`);
    }
}

truckerRouter.put("/update", async (req, res) => {
    const dbResponse = await db.update(req.body.newData, req.body.id)
    console.log(dbResponse);
    res.status(dbResponse[0]).send(dbResponse[1]);
})

truckerRouter.delete("/delete", async (req, res) => {
    const dbResponse = await db.remove(req.body.id)
    res.status(dbResponse[0]).send(dbResponse[1]);
})

export default truckerRouter;
