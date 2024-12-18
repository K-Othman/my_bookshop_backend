// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const booksRoutes = require("./routes/books.js");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/books", booksRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import books routes
const booksRoutes = require("./routes/books.js");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use books routes
app.use("/api/books", booksRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
