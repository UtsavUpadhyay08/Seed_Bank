const express = require("express");
const { getAllSeeds, createSeed, getSeedById, putSeed, deleteSeed } = require("../controllers/seedController");
const { depositSeeds, retrieveSeeds, totaldeposited, totalretrieved, alltransactions } = require("../controllers/transactionController");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const seedRouter = express.Router();

seedRouter.route("/")
    .get(getAllSeeds);          //get all seeds


seedRouter.use(protectRoute);
seedRouter.route("/")
    .post(isAuthorised("admin"), createSeed);
    
seedRouter.route("/:id")
    .get(getSeedById)                           //get particular type of seed
    .put(isAuthorised("admin"),putSeed)         //updates seed if transaction performed
    .delete(isAuthorised("admin"),deleteSeed);     //delete seed if quantity becomes empty

seedRouter.use(isAuthorised("admin"));

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