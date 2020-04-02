const router = require("express").Router();
const Users = require("./user-model");
const qa = require("../middleware/qa-middleware");
const postRouter = require("../posts/posts-router");

router.use("/:userId/posts", postRouter);

// const { postsValidator } = require("../middleware/validators");

//  List All Users >>>>>>>>
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "internal server error - listing users" });
    });
});

//  List user by ID >>>>>>>>
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "internal server error -user by id" });
    });
});

//  Add New Users >>>>>>>>
router.post("/", async (req, res) => {
  const users = req.body;
  try {
    const newUsers = await Users.add(users);
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(500).json({ error: "error creating new user" });
  }
});

//  Delete Users >>>>>>>>
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "internal server error - Deleting" });
    });
});

//  Update Users >>>>>>>
router.put("/:id", qa, (req, res) => {
  const id = req.params.id;
  const change = req.body;

  Users.update(id, change)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error - Updating" });
    });
});

module.exports = router;
