const express = require("express");
const { sequelize } = require("./db");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.use("/api/auth/register",);
// app.use("/api/auth/login",);
// app.use("/api/auth/logout",);
// app.use("/api/users",);
// app.use("/api/seeds",);
// app.use("/api/events",);
// app.use("/api/files",);