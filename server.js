const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));

const booksRoutes = require("./routes/books.js");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/books", booksRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
