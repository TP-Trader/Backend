const router = require("express").Router({ mergeParams: true });
const Posts = require("./posts-model");
const responseRouter = require("../responses/responses-router");
// const qa = require("../middleware/qa-middleware");
const findPostById = require("../middleware/findPostById");

router.use("/:postId/responses", responseRouter);

// const { postsValidator } = require("../middleware/validators");

//  List All post for user >>>>>>>>
router.get("/", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Posts.findByUser(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  List post by ID >>>>>>>>
router.get("/:id", findPostById, async (req, res) => {
  const { post } = req;
  res.status(200).json(post);
});

//  Add New Posts >>>>>>>>
router.post("/", async (req, res) => {
  const { userId } = req.params;
  const post = req.body;
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  try {
    if (post) {
      const newPost = await Posts.add({ user_id: userId, date: date, ...post });
      if (newPost) {
        res.status(201).json(newPost);
      } else {
        res.status(404).json({ message: "post could not be added" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Delete Posts >>>>>>>>
router.delete("/:id", findPostById, async (req, res) => {
  const { id } = req.params;
  try {
    await Posts.remove(id);
    res
      .status(200)
      .json({
        message: "Successfully deleted"
      })
      .end();
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

//  Update Posts >>>>>>>
router.put("/:id", findPostById, async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  try {
    await Posts.update(id, change);
    res
      .status(200)
      .json(change)
      .end();
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
