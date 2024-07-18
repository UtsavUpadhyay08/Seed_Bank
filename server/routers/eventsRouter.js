const express = require("express");
const { getAllEvents, createEvent, getEventById, putEvent, deleteEvent } = require("../controllers/eventController");
const eventsRouter = express.Router();

eventsRouter.route("/")
    .get(getAllEvents)          //get all events
    .post(createEvent);        //if admin then can create new variety

eventsRouter.route("/:id")
    .get(getEventById)         //get particular type of event
    .put(putEvent)         //updates event 
    .delete(deleteEvent);     //deletes event

module.exports = eventsRouter;