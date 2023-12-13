const express = require("express");
const route = express.Router();
const authRoutes = require("./auth")
const userRoutes = require("./user")
const homeRoutes = require("./home")
const blogRoutes = require("./blog")
const peopleRoutes = require("./people")
const careerRoutes = require("./career")
const workRoutes = require("./work")
const pageBGRoutes = require("./pageBG")

route.use("/", authRoutes);
route.use("/", userRoutes);
route.use("/", homeRoutes);
route.use("/", blogRoutes);
route.use("/", peopleRoutes);
route.use("/", careerRoutes);
route.use("/", workRoutes);
route.use("/", pageBGRoutes);




module.exports = route;
