const express = require("express");
const multer = require("multer");
const route = express.Router();
const upload = require("../../middlewear/imageUploader");
const Career = require("../../models/Career");

// all Career
route.get("/career",async (req, res) => {
  const peopleData = await Career.findAll()
  .then((data) => {
    res.status(201).json({ message: "Career data get successfully", data });
  })
  .catch((error) => {
    console.log("Error getting", error);
  });

});
// create Career
route.post("/createcareer",upload.single('file'), async (req, res) => {
  const { title, vacancy, description, education, salary } = req.body;

  try {
    const data = await Career.create({
      title,
      vacancy,
      description,
      education,
      salary
    });
    res.status(201).json({ message: "Career Created successfully", data });
  } catch (error) {
    console.error("Error creating Career entry:", error);
    res.status(500).json({ error: "Failed to create Career entry" });
  }
});


// Edit Career
route.post("/updatecareer/",upload.single('file'), async (req, res) => {
  const { id, title, vacancy, description, education, salary } = req.body;
    try {
      const [updatedRows, updatedData] = await Career.update(
        {
          title,
          vacancy,
          description,
          education,
          salary
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
});

// Delete Career
route.post("/deletecareer/", async(req, res) => {
  try {
    const { id } = req.body; // Make sure id is sent as { id: yourIdValue }
    
    // Use the id in the where condition
    const data = await Career.destroy({
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
