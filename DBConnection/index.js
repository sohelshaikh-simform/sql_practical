const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "sql_practical",
  process.env.username,
  process.env.password,
  {
    host: "localhost",
    dialect: "mysql",
    // logging:false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

sequelize.sync({}).then(() => {
  console.log("yes re sync");
});

module.exports = sequelize;