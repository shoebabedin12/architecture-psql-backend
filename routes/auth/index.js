const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const { await } = require("await");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// login
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email }
    });
    if (!user) {
      return res.json({ Login: false });
    }
    const isPassordValid = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (isPassordValid) {
      const userData = {
        name: user.name,
        email: user.email
      };
      return res.json({ Login: true,message: "Login successfull", data: userData });
    } else {
      return res.jsonc({ Login: false });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.json("Error");
  }
});

// Signup
route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if any of the required fields are missing or empty
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPwd 
    });
    return res.status(200).json({
      message: "User created successfully",
      user
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to create user" });
  }
});

module.exports = route;
