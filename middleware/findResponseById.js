const Response = require("../responses/responses-model");

const findResponseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Response.findById(id);
    if (!response) {
      return res.status(404).json({
        error: `No response exists with id ${id}`,
      });
    } else {
      req.response = response;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

module.exports = findResponseById;
