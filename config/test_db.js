const pool = require("./db.js");

(async () => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    console.log("Database connected:", result.rows[0].current_time);
    pool.end();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
