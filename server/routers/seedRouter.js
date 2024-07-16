const express = require("express");
const { getAllSeeds, createSeed, getSeedById, putSeed, deleteSeed } = require("../controllers/seedController");
const seedRouter = express.Router();

seedRouter.route("/")
    .get(getAllSeeds)          //get all seeds
    .post(createSeed);        //if admin then can create new variety

seedRouter.route("/:id")
    .get(getSeedById)         //get particular type of seed
    .put(putSeed)         //updates seed if transaction performed
    .delete(deleteSeed);     //delete seed if quantity becomes empty

// seedRouter.route("/deposit")
//     .post();       //deposit seed

// seedRouter.route("/retrieve")
//     .post();       //retrieve seed

// seedRouter.route("totaldeposited")
//     .get();

// seedRouter.route("totalretrieved")
    // .get();

module.exports = seedRouter;