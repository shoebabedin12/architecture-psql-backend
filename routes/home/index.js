const express = require("express");
const multer = require("multer");
const route = express.Router();
const path = require("path");
const upload = require("../../middlewear/imageUploader");
const Home = require("../../models/Home");
const { where } = require("sequelize");

// get all data
route.get("/home", async (req, res) => {
  const homeData = await Home.findAll()
    .then((users) => {
      // console.log("users:", users);
      res.status(201).json({ message: "Home data get successfully", users });
    })
    .catch((error) => {
      console.log("Error getting", error);
    });
});

// create new data
route.post(
  "/createhome",
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    const { companyName, address, phone, email, googleMap } = req.body;
    const files = req.files;

    try {
      const singleImg = files["file"] ? req.files["file"][0].filename : null;
      const multipleImg = Array.isArray(files["files"])
        ? files["files"].map((file) => file.filename)
        : [];

      const createdHome = await Home.create({
        companyName,
        address,
        phone,
        email,
        googleMap,
        image: singleImg,
        home_slider: multipleImg
      });

      console.log("Home entry created:", createdHome);
      res.status(201).json({
        message: "Home entry created successfully",
        home: createdHome
      });
    } catch (error) {
      console.error("Error creating home entry:", error);
      res.status(500).json({ error: "Failed to create home entry" });
    }
  }
);

// Update data
route.post(
  "/updatehome",
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    const { id, companyName, address, phone, email, googleMap, file, files } =
      req.body;

    try {
      const [updatedRows, updatedData] = await Home.update(
        {
          companyName,
          address,
          phone,
          email,
          googleMap,
          image: file,
          home_slider: files
        },
        {
          where: { id: id }
        }
      );

      if (updatedRows > 0) {
        console.log("Update successful:", updatedData);
        console.log("Home Updated:", updatedData);
      } else {
        console.log("No records were updated.");
      }

      res.status(201).json({
        message: "Home Updated successfully",
        updateHome: updatedData
      });
    } catch (error) {
      console.error("Error updating home entry:", error);
      res.status(500).json({ error: "Failed to update home entry" });
    }
  }
);

// delete data
route.post("/deletehome", async (req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await Home.destroy({
      where: { id : id }
    });

    if (data > 0) {
      console.log(`Record with id ${id} deleted successfully.`);
      res.status(200).json({ message: `Record with id ${id} deleted successfully.` });
    } else {
      console.log(`No record found with id ${id}. Nothing deleted.`);
      res.status(404).json({ error: `No record found with id ${id}. Nothing deleted.` });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Failed to delete record.' });
  }
});


module.exports = route;
