const router = require("express").Router();
const Posts = require("./posts-model");
const qa = require("../middleware/qa-middleware");

const { postsValidator } = require("../middleware/validators");

//  List All Tasks >>>>>>>>
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

//  List tasks by ID >>>>>>>>
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "internal server error -posts by id" });
    });
});

//  Add New Posts >>>>>>>>
router.post("/", async (req, res) => {
  const posts = req.body;
  try {
    const newPosts = await Posts.add(posts);
    res.status(201).json(newPosts);
  } catch (error) {
    res.status(500).json({ error: "error creating new post" });
  }
});

//  Delete Posts >>>>>>>>
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "internal server error - Deleting" });
    });
});

//  Update Posts >>>>>>>
router.put("/:id", qa, (req, res) => {
  const id = req.params.id;
  const change = req.body;

  Posts.update(id, change)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error - Updating" });
    });
});

module.exports = router;
