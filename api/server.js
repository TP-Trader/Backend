const express = require("express");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../user/user-router");
const postsRouter = require("../posts/posts-router");
const cors = require("cors");
const helmet = require("helmet");
const bodyparser = require("body-parser");

//  middleware  >>>>>>>>
const restricted = require("../middleware/restricted-middleware");

const server = express();

server.use(express());
server.use(bodyparser.json());
server.use(cors());
server.use(helmet());

//  endpoints beginning with /api/... >>>>>>>>
server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/posts", restricted, postsRouter);

//  sanity check  >>>>>>>>
server.get("/", (req, res) => {
  res.send("API SET UP AND WORKING!");
});

module.exports = server;
