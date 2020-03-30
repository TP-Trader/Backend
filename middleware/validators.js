const { userSchema } = require('../middleware/schema');

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({error: error.message})
  } else {
    next()
  }
}

module.exports = { userValidator };