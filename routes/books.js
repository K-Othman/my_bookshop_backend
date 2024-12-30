const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// Getting All the books
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    console.log(result.rows);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch books" });
  }
});

// Posting a new book

router.post("/", async (req, res) => {
  try {
    const { title, author, price, published_date, category_id, image } =
      req.body;

    const result = await pool.query(
      "INSERT INTO books (title, author, price, published_date, category_id,image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [title, author, price, published_date, category_id, image]
    );
    // const values = [title , author, price, published_date, category_id,image]
    console.log(result.rows);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Faild to add book" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Faild to delete the book" });
  }
});

module.exports = router;
