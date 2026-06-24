const express = require("express");
const router = express.Router();

const hierarchyController = require("../controllers/hierarchy.controller");

router.get("/:salesCode", hierarchyController.getHierarchyBySalesCode);

module.exports = router;