const router = require("express").Router();
const Posts = require("./posts-model");

// const { postsValidator } = require("../middleware/validators");



//  List All landing page posts >>>>>>>>
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "internal server error - listing tasks" });
    });
});

module.exports = router;