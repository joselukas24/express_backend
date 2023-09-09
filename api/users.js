const express = require("express");
const router = express.Router();

const { getUsers, checkUser, postUser } = require("../db/users");

// GET - api/users/login - Login User
router.get("/login", async (req, res) => {
  try {
    const check = await checkUser(req.body);
    if (check) {
      res.send("Login Successful!");
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
