const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUsers, loginUser, signupUser } = require("../db/users");

// GET - api/users/login - Login User
router.get("/login", async (req, res) => {
  try {
    const check = await loginUser(req.body);
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

// POST - api/users/signup - post user
router.post("/user/signup", async (req, res) => {
  try {
    const user = await postUser(req.body);
    res.json(user);
  } catch (error) {
    res.send(error.detail);
  }
});

router.post("/user/cart/add", async (req, res) => {
  try {
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      res.send(decoded);
    }
  } catch (error) {
    res.status(400).send("Error adding to cart");
  }
});

module.exports = router;
