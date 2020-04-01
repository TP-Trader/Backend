module.exports = (req, res, next) => {
  if (req.body.password && req.body.email) {
    next();
  } else {
    res.status(400).json({ message: "Email and Password Required" });
  }
};
