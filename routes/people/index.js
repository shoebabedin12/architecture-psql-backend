const express = require("express");
const multer = require("multer");
const route = express.Router();
const upload = require("../../middlewear/imageUploader");
const People = require("../../models/People");

// all People
route.get("/people", async (req, res) => {
  const peopleData = await People.findAll()
    .then((data) => {
      // console.log("users:", users);
      res.status(201).json({ message: "People data get successfully", data });
    })
    .catch((error) => {
      console.log("Error getting", error);
    });
});
// create People
route.post(
  "/createpeople",
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    const { name, designation, description } = req.body;
    const files = req.files;

    try {
      const profileImg = files["file"] ? req.files["file"][0].filename : null;
      const projectImg = Array.isArray(files["files"])
        ? files["files"].map((file) => file.filename)
        : [];

      const data = await People.create({
        name,
        designation,
        description,
        profileImage: profileImg,
        projectImage: projectImg
      });
      console.log("People entry created:", data);
      res.status(201).json({ message: "People Created successfully", data });
    } catch (error) {
      console.error("Error creating People entry:", error);
      res.status(500).json({ error: "Failed to create People entry" });
    }
  }
);

// Edit People
route.post(
  "/updatepeople/",
  upload.fields([{ name: "file" }, { name: "files" }]),
  async (req, res) => {
    const { id, name, designation, description, file, files } = req.body;
    try {
      const [updatedRows, updatedData] = await People.update(
        {
          name,
          designation,
          description,
          profileImage: file,
          projectImage: files
        },
        {
          where: { id: id }
        }
      );

      if (updatedRows > 0) {
        console.log("Update successful:", updatedData);
        console.log("People Updated:", updatedData);
      } else {
        console.log("No records were updated.");
      }

      res.status(201).json({
        message: "People Updated successfully",
        updateHome: updatedData
      });
    } catch (error) {
      console.error("Error updating People entry:", error);
      res.status(500).json({ error: "Failed to update People entry" });
    }
  }
);

// Delete People
route.post("/deletepeople/", async (req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await People.destroy({
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
