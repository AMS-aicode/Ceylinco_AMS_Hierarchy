const hierarchyService = require("../services/hierarchy.service");

const getHierarchyBySalesCode = async (req, res) => {
  try {
    const { salesCode } = req.params;

    if (!salesCode) {
      return res.status(400).json({
        success: false,
        message: "Sales Code is required"
      });
    }

    //const result = await hierarchyService.getHierarchyBySalesCode(salesCode);
const env = req.query.env || "dev";

const result = await hierarchyService.getHierarchyBySalesCode(
    salesCode,
    env
);
    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

module.exports = {
  getHierarchyBySalesCode
};