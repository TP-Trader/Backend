const { userSchema, postsSchema } = require('../middleware/schema-middleware');

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    next();
  }
};

const postValidator = (req, res, next) => {
  const { error } = postsSchema.validate(req.body);

  if (error) {
    res.status(400).json(postSchema.validate(req.body).error);
  } else {
    next();
  }
};

module.exports = { userValidator };
