const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("inspace", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres"
});

const Career = sequelize.define(
  "career",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vacancy: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
      allowNull: false
    },
    education: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salary: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);
// Synchronize the model with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = Career;
