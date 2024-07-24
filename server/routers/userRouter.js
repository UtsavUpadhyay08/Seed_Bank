const express = require("express");
const { getUser, putUser, deleteUser } = require("../controllers/userController");
const { protectRoute } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.use(protectRoute);

userRouter.route("/:id")
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);
module.exports = userRouter;