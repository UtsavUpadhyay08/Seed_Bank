const express = require("express");
const { register, login } = require("./controllers/authController");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/auth/register",register);
app.post("/api/auth/login",login);
// app.use("/api/auth/logout",);
// app.use("/api/users",);
// app.use("/api/seeds",);
// app.use("/api/events",);
// app.use("/api/files",);