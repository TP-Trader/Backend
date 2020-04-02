const router = require("express").Router({ mergeParams: true });
const Posts = require("./posts-model");
const qa = require("../middleware/qa-middleware");
const findPostById = require("../middleware/findPostById");

const { postsValidator } = require("../middleware/validators");

//  List All Tasks for user >>>>>>>>
router.get("/", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Posts.find(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  List tasks by ID >>>>>>>>
router.get("/:id", findPostById, async (req, res) => {
  const { post } = req;
  res.status(200).json(post);
});

//  Add New Posts >>>>>>>>
router.post("/", async (req, res) => {
  const { userId } = req.params;
  const post = req.body;
  if (!post) {
    return res.status(400).json({ error: "Missing post body" });
  }
  try {
    const newPost = await Posts.add(post, userId);
    res.status(201).json(newPost);
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
