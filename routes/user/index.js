const express = require("express");
const db = require("../../config/connection");
const multer = require("multer");
const route = express.Router();
const path = require("path");

// Use of Multers
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/uploads/"); // 'uploads/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage
});

// user all get
route.get("/viewuser", (req, res) => {
  const sql = `SELECT * FROM users`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// user update
route.post("/updateuser/:id", upload.single("file"), (req, res) => {
  var imgsrc = req.file.filename;
  const addData = [req.body.email, req.body.u_name, imgsrc];
  if (!req.file) {
    console.log("No file upload");
  } else {
    const sql = `UPDATE users SET email = '${req.body.email}', u_name = '${req.body.u_name}', image = '${imgsrc}' WHERE id = ${req.params.id}`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});

// user delete
route.post("/deleteuser/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = route;
