// routes/books.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Example route for testing
router.get("/", (req, res) => {
  res.send("Books API is working!");
});

module.exports = router;
