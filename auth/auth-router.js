const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth-middleware");

const { userValidator } = require("../middleware/validators");

const Users = require("./auth-model");
const { jwtSecret } = require("./secrets");

//  CRUD endpoints beginning with /api/auth

//  POST  >>>>>>>>
//  Create new user
router.post("/register", userValidator, (req, res) => {
  let user = req.body;
  // console.log(req.body, "Lions, and tigers, and Bears, OH MY!");
  const hash = bcrypt.hashSync(user.password, 6);

  user.password = hash;
  // res.status(200).json(user.password);

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: "New user saved!" });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

//  User Login
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.findBy(email)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ id: user.id, email: user.email, token });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
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
