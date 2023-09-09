const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUsers, checkUser, postUser } = require("../db/users");

// GET - api/users/login - Login User
router.get("/login", async (req, res) => {
  try {
    const check = await checkUser(req.body);
    if (check) {
      const accessToken = jwt.sign(
        { email: req.body.email },
        process.env.WEB_TOKEN,
        { expiresIn: "15m" }
      );
      res.json({ "Login Successful!": accessToken });
    } else {
      res.send("Wrong email or password! Please try again");
    }
  } catch (error) {
    res.send(error.detail);
    throw error;
  }
});

// POST - api/users/create - post user
router.post("/user/create", async (req, res) => {
  try {
    const user = await postUser(req.body);
    res.json(user);
  } catch (error) {
    res.send(error.detail);
  }
});

module.exports = router;
