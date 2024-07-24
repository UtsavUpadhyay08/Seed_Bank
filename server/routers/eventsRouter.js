const express = require("express");
const { getAllEvents, createEvent, getEventById, putEvent, deleteEvent } = require("../controllers/eventController");
const { protectRoute } = require("../controllers/authController");
const eventsRouter = express.Router();

eventsRouter.route("/")
    .get(getAllEvents)          //get all events
    .post(protectRoute,createEvent);        //if admin then can create new variety

eventsRouter.route("/:id")
    .get(getEventById)         //get particular type of event
    .put(protectRoute,putEvent)         //updates event 
    .delete(protectRoute,deleteEvent);     //deletes event

module.exports = eventsRouter;