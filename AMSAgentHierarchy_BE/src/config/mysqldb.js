// require("dotenv").config();
// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;



const mysql = require("mysql2/promise");

const devPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DEV_DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.TEST_DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getPool = (env = "dev") => {
  return env === "test" ? testPool : devPool;
};

module.exports = getPool;