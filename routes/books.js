const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Example route for testing
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    console.log(result.rows);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch books" });
  }
});

module.exports = router;
