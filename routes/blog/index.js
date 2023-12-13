const express = require("express");
const multer = require("multer");
const route = express.Router();
const db = require("../../config/connection");
const path = require("path");
const upload = require("../../middlewear/imageUploader");
const Blog = require("../../models/Blog");

// all blog
route.get("/blog", async (req, res) => {
  const homeData = await Blog.findAll()
    .then((blogs) => {
      res.status(201).json({ message: "Blog data get successfully", blogs });
    })
    .catch((error) => {
      console.log("Error getting", error);
    });
});

// create blog
route.post("/createblog", upload.fields([{ name: "files" }]), async (req, res) => {
  const { title, content } = req.body;
  const files = req.files;

  try {
    const multipleImg = Array.isArray(files["files"])
      ? files["files"].map((file) => file.filename)
      : [];

    const data = await Blog.create({
      title,
      description: content,
      image: multipleImg
    });
    res.status(200).json({ message: "Blog Created successfully", data });
  } catch (error) {
    console.error("Error creating Blog entry:", error);
    res.status(500).json({ error: "Failed to create Blog entry" });
  }
});

// Edit blog
route.post("/updateblog/", upload.fields([{ name: "files" }]), async(req, res) => {
  const { id, title, content, files } = req.body;

  try {
    const [updatedRows, updatedData] = await Blog.update(
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
      console.log("Blog Updated:", updatedData);
    } else {
      console.log("No records were updated.");
    }

    res.status(201).json({
      message: "Home Updated successfully",
      updateWork: updatedData
    });
  } catch (error) {
    console.error("Error updating Blog entry:", error);
    res.status(500).json({ error: "Failed to update Blog entry" });
  }
});


// delete data
route.post("/deleteblog", async (req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await Blog.destroy({
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
