const express = require("express");
const { getAllEvents, createEvent, getEventById, putEvent, deleteEvent } = require("../controllers/eventController");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const eventsRouter = express.Router();

eventsRouter.route("/")
    .get(getAllEvents);          //get all events

eventsRouter.route("/:id")
    .get(getEventById);        //get particular type of event
    
eventsRouter.use(protectRoute);
eventsRouter.use(isAuthorised("admin"));

eventsRouter.route("/") 
    .post(createEvent);        //if admin then can create new variety

eventsRouter.route("/:id")
    .put(putEvent)         //updates event 
    .delete(deleteEvent);     //deletes event

module.exports = eventsRouter;