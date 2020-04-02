const Post = require("../posts/posts-model");

const findPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        error: `No post exists with id ${id}`
      });
    } else {
      req.post = post;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
    throw err;
  }
};

module.exports = findPostById;
