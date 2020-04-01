const Joi = require("@hapi/joi");

const userSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
});

const postsSchema = Joi.object().keys({
  want_need: Joi.string().required(),
  posts_city: Joi.string().required(),
  trade_type: Joi.string().required(),
  trade_desc: Joi.string().required()
});

module.exports = {
  userSchema,
  postsSchema
};
