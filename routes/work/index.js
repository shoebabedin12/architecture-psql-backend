const express = require("express");
const multer = require("multer");
const route = express.Router();
// const db = require("../../config/connection");
const path = require("path");
const upload = require("../../middlewear/imageUploader");
const Work = require("../../models/Work");

// get all work
route.get("/work", async (req, res) => {
  const homeData = await Work.findAll()
    .then((works) => {
      res.status(201).json({ message: "Home data get successfully", works });
    })
    .catch((error) => {
      console.log("Error getting", error);
    });
});

// create work
route.post(
  "/creatework",
  upload.fields([{ name: "files" }]),
  async (req, res) => {
    const { title, content } = req.body;
    const files = req.files;
    try {
      const multipleImg = Array.isArray(files["files"])
        ? files["files"].map((file) => file.filename)
        : [];

      const createWork = await Work.create({
        title,
        description: content,
        image: multipleImg
      });
      res.status(201).json({
        message: "Work entry created successfully",
        work: createWork
      });
    } catch (error) {
      console.error("Error creating Work entry:", error);
      res.status(500).json({ error: "Failed to create Work entry" });
    }
  }
);


// Update data
route.post(
  "/updatework",
  upload.fields([{ name: "files" }]),
  async (req, res) => {
    const { id, title, content, files } = req.body;

    try {
      const [updatedRows, updatedData] = await Work.update(
        {
          title,
          description:content,
          image: files
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
        updateWork: updatedData
      });
    } catch (error) {
      console.error("Error updating home entry:", error);
      res.status(500).json({ error: "Failed to update home entry" });
    }
  }
);


// delete data
route.post("/deletework", async (req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await Work.destroy({
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
