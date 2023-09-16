const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUsers,
  loginUser,
  signupUser,
  getCartItems,
} = require("../db/users");

// POST - api/users/user/login - Login User
router.post("/user/login", async (req, res) => {
  try {
    const check = await loginUser(req.body);
    if (check) {
      const accessToken = jwt.sign(
        { email: req.body.email },
        process.env.WEB_TOKEN,
        { expiresIn: "5h" }
      );
      res.json({ accessToken });
    } else {
      res.json({ message: "Wrong email or password! Please try again" });
    }
  } catch (error) {
    res.json(error);
    throw error;
  }
});

// POST - api/users/user/signup - post user
router.post("/user/signup", async (req, res) => {
  try {
    const user = await signupUser(req.body);
    const check = await loginUser(req.body);
    if (check) {
      const accessToken = jwt.sign(
        { email: loginUser.email },

        process.env.WEB_TOKEN,
        { expiresIn: "5h" }
      );
      res.json({ accessToken });
    } else {
      res.json({ message: "Wrong email or password! Please try again" });
    }
  } catch (error) {
    res.json(error);
  }
});

// GET - api/users/user/cart return the cart items
router.post("/user/cart/", async (req, res) => {
  try {
    console.log(req.body);
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      console.log(decoded);
      if (decoded.email) {
        res.send(decoded);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST - api/users/user/cart/add add an item to the users cart
router.post("/user/cart/add", async (req, res) => {
  try {
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      if (decoded.email) {
        // Get user_id using the email that is saved in local storage
        // With the user_id get the cart_id
        // With this cart_id add the item to the cart_items table
        res.send(decoded);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST - api/users/user/cart/delete delete an item to the users cart
router.delete("/user/cart/delete", async (req, res) => {
  try {
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      if (decoded.email) {
        // Get user_id using the email that is saved in local storage
        // With the user_id get the cart_id
        // With this cart_id remove the item from the cart_items table
        res.send(decoded);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
