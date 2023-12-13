const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const route = require("./routes");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const routes = require("./routes");
const { sequelize, testDbConnection } = require("./config/connection");

// Call the function to establish the connection

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
app.use(routes);
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

testDbConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
