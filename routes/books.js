// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db.js");

// // Getting All the books
// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM books");
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Faild to fetch books" });
//   }
// });

// // Getting book with ID

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: "Faild to fetch a book" });
//   }
// });

// // POSTING A NEW BOOK

// router.post("/", async (req, res) => {
//   try {
//     const { title, author, price, published_date, category_id, image } =
//       req.body;

//     const result = await pool.query(
//       "INSERT INTO books (title, author, price, published_date, category_id,image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
//       [title, author, price, published_date, category_id, image]
//     );
//     cosmos;
//     console.log(result.rows);

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: "Faild to add book" });
//   }
// });

// // DELETING A BOOK
// router.delete("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!id || isNaN(id)) {
//       return res.status(400).json({ error: "Invalid book ID" });
//     }
//     const result = await pool.query(
//       "DELETE FROM books WHERE id = $1 RETURNING *",
//       [id]
//     );
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }
//     res.json({ message: "Book deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Faild to delete the book" });
//   }
// });

// // FILTERING THE BOOKS DEPENDING ON THEIR CATEGORY
// router.get("/category/:category_id", async (req, res) => {
//   const { category_id } = req.params;
//   try {
//     const result = await pool.query(
//       "SELECT * FROM books WHERE category_id = $1",
//       [category_id]
//     );
//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "No books found for this category" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch books by category" });
//   }
// });
// // ADD A WISH LIST
// router.post("/wishlist", async (req, res) => {
//   const { user_id, book_id } = req.body;

//   if (!user_id || !book_id) {
//     return res
//       .status(400)
//       .json({ message: "User Id and Book Id are required" });
//   }
//   try {
//     const result = await pool.query(
//       "INSERT INTO wishlist (user_id, book_id) VALUES ($1, $2) RETURNING *",
//       [user_id, book_id]
//     );
//     res
//       .status(201)
//       .json({ message: "Book added to wishlist", data: result.rows[0] });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add book to wishlist" });
//   }
// });

// // Get the wish list books
// router.get("/wishlist", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM wishlist");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch wishlist" });
//   }
// });

// module.exports = router;
// //       "SELECT books.* FROM wishlist JOIN books ON wishlist.book_id = book_id WHERE wishlist.user_id = $1",
const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// 1. Get Wishlist FIRST
router.get("/wishlist", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wishlist");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// 2. Add to Wishlist
router.post("/wishlist", async (req, res) => {
  const { user_id, book_id } = req.body;

  if (!user_id || !book_id) {
    return res
      .status(400)
      .json({ message: "User Id and Book Id are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO wishlist (user_id, book_id) VALUES ($1, $2) RETURNING *",
      [user_id, book_id]
    );
    res
      .status(201)
      .json({ message: "Book added to wishlist", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book to wishlist" });
  }
});

// 3. Get All Books
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch books" });
  }
});

// 4. Get Book by ID (must be AFTER /wishlist)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch a book" });
  }
});

// 5. Add a new Book
router.post("/", async (req, res) => {
  try {
    const { title, author, price, published_date, category_id, image } =
      req.body;

    const result = await pool.query(
      "INSERT INTO books (title, author, price, published_date, category_id, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [title, author, price, published_date, category_id, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Faild to add book" });
  }
});

// 6. Delete a Book
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

// 7. Filter Books by Category
router.get("/category/:category_id", async (req, res) => {
  const { category_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM books WHERE category_id = $1",
      [category_id]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No books found for this category" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books by category" });
  }
});

module.exports = router;
