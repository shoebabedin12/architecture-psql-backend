const express = require("express");
const multer = require("multer");
const route = express.Router();
const upload = require("../../middlewear/imageUploader");
const PageBG = require("../../models/PageBg");

// create Page bg
route.post("/createPagebg", upload.fields([{ name: "file" }]), async (req, res) => {
  const addData = {title} = req.body;
  const files = req.files;

  try {
    const profileImg = files["file"] ? req.files["file"][0].filename : null;

    const data = await PageBG.create({
      title,
      image: profileImg
    });

    res.status(200).json({ message: "PageBG Created successfully", data });
  } catch (error) {
    console.error("Error creating Blog entry:", error);
    res.status(500).json({ error: "Failed to create Blog entry" });
  }

  
});

// all Home
route.get("/allPagebg",async (req, res) => {
  const homeData = await PageBG.findAll()
  .then((data) => {
    res.status(201).json({ message: "Blog data get successfully", data });
  })
  .catch((error) => {
    console.log("Error getting", error);
  });
});

// Edit blog
route.post("/updatePagebg/", upload.fields([{ name: "file" }]), async (req, res) => {
  const { id, title } = req.body;
  const files = req.files;
// return;
  try {
    const profileImg = files["file"] ? req.files["file"][0].filename : null;
    const data = await PageBG.update(
      {
        title,
        image: profileImg
      },
      {
        where: { id: id }
      }
    );

  
    res.status(201).json({
      message: "PageBG Updated successfully",
      data
    });

  } catch (error) {
    console.error("Error updating Blog entry:", error);
    res.status(500).json({ error: "Failed to update Blog entry" });
  }
});

// Delete Pagebg
route.post("/deletePagebg/", async(req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await PageBG.destroy({
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
