require("dotenv").config();

const app = require("./app");
const getPool = require("./config/mysqlDb");

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    // Get DEV pool while starting the application
    const pool = getPool("dev");

    // Test the connection
    const connection = await pool.getConnection();

    console.log("✅ MySQL connected successfully");

    // Release connection back to pool
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

startServer();