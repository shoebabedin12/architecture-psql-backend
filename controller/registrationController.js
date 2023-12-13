const { query } = require("express");

const registrationController = (req, res) => {
  // const sql = `INSERT INTO users (email, password, u_name) VALUES (?)`;

  const addData = [req.body.email, req.body.password, req.body.u_name];

  query(sql, [addData], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = { registrationController };
