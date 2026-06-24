const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AMS Agent Hierarchy Backend is running"
  });
});
const hierarchyRoutes = require("./routes/hierarchy.routes");

app.use("/api/hierarchy", hierarchyRoutes);

module.exports = app;


