const { userSchema, postsSchema } = require("../middleware/schema-middleware");

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  // console.log(req.body, "errors everywhere");

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    next();
  }
};

const postsValidator = (req, res, next) => {
  const { error } = postsSchema.validate(req.body);

  if (error) {
    res.status(400).json(postsSchema.validate(req.body).error);
  } else {
    next();
  }
};

module.exports = { userValidator, postsValidator };
