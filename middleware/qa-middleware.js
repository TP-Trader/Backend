module.exports = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Posts content not found!" });
  } else {
    next();
  }
};
