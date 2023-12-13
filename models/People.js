const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("inspace", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres"
});

const People = sequelize.define(
  "people",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    projectImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
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

module.exports = People;
