const express = require("express");
const eventsRouter = express.Router();

eventsRouter.route("/")
    // .get()          //get all events
    // .post();        //if admin then can create new variety

eventsRouter.route("/:id")
    // .get()         //get particular type of event
    // .put()         //updates event if transaction performed
    // .delete();     //delete event if quantity becomes empty

module.exports = eventsRouter;