const express = require("express");
const { register, login, logout } = require("./controllers/authController");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const cookieParser = require("cookie-parser");
const { verifyemail } = require("./controllers/userController");
const app = express();

app.use(express.json());
app.use(cookieParser());;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/auth/register",register);
app.post("/api/auth/login",login);
app.get("/api/auth/logout",logout);
app.use("/api/users",userRouter);
app.use("/api/seeds",seedRouter);
app.get("/verify/:token", verifyemail);