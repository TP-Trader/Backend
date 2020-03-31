const express = require("express");
const authRouter = require("../auth/auth-router");
const postsRouter = require('../posts/posts-router');
const cors = require("cors");
const helmet = require("helmet");

//  middleware  >>>>>>>>
const restricted = require("../middleware/restricted-middleware");

const server = express();

server.use(express());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use('/api/posts', restricted, postsRouter);

//  sanity check  >>>>>>>>
server.get("/", (req, res) => {
  res.send("API SET UP AND WORKING!");
});

module.exports = server;
