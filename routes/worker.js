import express from "express";

const workerRouter = express.Router();

workerRouter.post("/add", (req, res) => {
    try{
        validateTime(req.body.schedule.monday);
        validateTime(req.body.schedule.tuesday);
        validateTime(req.body.schedule.wednesday);
        validateTime(req.body.schedule.thursday);
        validateTime(req.body.schedule.friday);
        validateTime(req.body.schedule.saturday);
        validateTime(req.body.schedule.sunday);
    }
    catch(err) {
        switch (err.name) 
        {
            case "SyntaxError":
                res.status(400).send(`Invalid time for schedule. ${err.message}`);
            default:
                res.status(400).send(`unknown error: ${err.message}`);
        }
    }

    res.status(200).send("time accepted");
})

function validateTime(day) {
    let start = day.start.split(":");
    let end = day.end.split(":");
    if (0 < parseInt(start[0]) > 23) {
        throw new SyntaxError("invalid time for hours on start time");
    } 
    else if(0 < parseInt(start[1]) > 59) {
        throw new SyntaxError("invalid time for minutes on start time");
    }
    else if (0 < parseInt(end[0]) > 23)  {
        throw new SyntaxError("invalid time for hours on end time");
    } 
      else if (0 < parseInt(end[1]) > 59) {
        throw new SyntaxError("invalid time for minutes on end time");
    }
}

export default workerRouter;
