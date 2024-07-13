const { Sequelize } = require("sequelize");

require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // ssl: true,
});

sequelize.authenticate().then(() => {
  console.log("Database Connected");
})
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });

  

module.exports.sequelize = sequelize;