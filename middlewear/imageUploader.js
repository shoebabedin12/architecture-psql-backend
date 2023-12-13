const express = require("express")
const multer = require("multer");
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
  
  module.exports = upload;