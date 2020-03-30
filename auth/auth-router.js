const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("./secrets");

//  CRUD endpoints beginning with /api/auth

//  POST  >>>>>>>>
//  Create new user
router.post("/register", userValidator, (req, res) => {
  let user = req.body;
  console.log(req.body, "Lions, and tigers, and Bears, OH MY!");
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: "New user saved!" });
    })
    .catch(error => {
      res.status(500).json(err.message);
    });
});

//  User Login
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(err.message);
    });
});

//  Create user token upon login >>>>>>>>
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
