const express = require("express");
const { getAllSeeds, createSeed, getSeedById, putSeed, deleteSeed } = require("../controllers/seedController");
const { depositSeeds, retrieveSeeds, totaldeposited, totalretrieved, alltransactions } = require("../controllers/transactionController");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const seedRouter = express.Router();

seedRouter.route("/")
    .get(getAllSeeds);          //get all seeds

seedRouter.route("/:id")
    .get(getSeedById)           //get particular seed


seedRouter.use(protectRoute);
seedRouter.use(isAuthorised("admin"));

seedRouter.route("/")
    .post(createSeed);
    
seedRouter.route("/:id")
    .put(putSeed)               //updates seed if transaction performed
    .delete(deleteSeed);        //delete seed if quantity becomes empty

seedRouter.route("/deposit/:id")
    .post(depositSeeds);                //deposit seed

seedRouter.route("/retrieve/:id")
    .post(retrieveSeeds);               //retrieve seed

seedRouter.route("totaldeposited")
    .get(totaldeposited);

seedRouter.route("totalretrieved")
    .get(totalretrieved);

seedRouter.route("alltransactions")
    .get(alltransactions)

module.exports = seedRouter;