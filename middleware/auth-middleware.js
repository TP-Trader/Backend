module.exports = (req, res, next) => {
  if (req.body.password && req.body.username) {
    next();
  } else {
    res.status(400).json({ message: "Username and Password Required" });
  }
};
