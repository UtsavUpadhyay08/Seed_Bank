const express = require("express");
const seedRouter = express.Router();

seedRouter.route("/")
    .get()          //get all seeds
    .post();        //if admin then can create new variety

seedRouter.route("/:id")
    .get()         //get particular type of seed
//     .put()         //updates seed if transaction performed
//     .delete();     //delete seed if quantity becomes empty

// seedRouter.route("/deposit")
//     .post();       //deposit seed

// seedRouter.route("/retrieve")
//     .post();       //retrieve seed

// seedRouter.route("totaldeposited")
//     .get();

// seedRouter.route("totalretrieved")
    // .get();

module.exports = seedRouter;