const express = require("express");
const { getUser, putUser, deleteUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/:id")
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);
module.exports = userRouter;