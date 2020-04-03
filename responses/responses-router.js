const router = require("express").Router({ mergeParams: true });
const Responses = require("./responses-model");
const findResponseById = require("../middleware/findPostById");
const Posts = require("../posts/posts-model");
const sendAcceptance = require("../mailer/tradeAcceptance");

const generateAcceptanceURL = (postId, userId) => {
  const HOSTNAME =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
  return `${HOSTNAME}/users/${userId}/posts/${postId}`;
};

router.get("/", async (req, res) => {
  const { postId } = req.params;
  try {
    const responses = await Responses.find(postId);
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  List response by ID >>>>>>>>
router.get("/:id", findResponseById, async (req, res) => {
  const { response } = req;
  res.status(200).json(response);
});

//  Add New response >>>>>>>>
router.post("/", async (req, res) => {
  const { postId } = req.params;
  const response = req.body;
  if (!response) {
    return res.status(400).json({ error: "Missing response body" });
  }
  try {
    const newResponse = await Responses.add(response, postId);
    const post = await Posts.findById(postId);
    const tradeAcceptanceURL = generateAcceptanceURL(postId, newResponse.id);
    sendAcceptance(newResponse, post, tradeAcceptanceURL);
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Delete response >>>>>>>>
router.delete("/:id", findResponseById, async (req, res) => {
  const { id } = req.params;
  try {
    await Responses.remove(id);
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

//  Update response >>>>>>>
router.put("/:id", findResponseById, async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  try {
    await Responses.update(id, change);
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
