const Sequelize = require("sequelize");

// const connection = () => {
  const sequelize = new Sequelize("inspace", "postgres", "123456", {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  });

  const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };


  module.exports = { sequelize, testDbConnection };