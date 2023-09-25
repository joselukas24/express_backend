const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUsers,
  loginUser,
  signupUser,
  getCartItems,
  addToCart,
  deleteCartItem,
  getAdmin,
  setAdmin,
} = require("../db/users");

// POST - api/users/
router.post("/", async (req, res) => {
  try {
    // Check the validity of the jsonwebtoken
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      if (decoded.email) {
        // If the jsonwebtoken is validated check to see if the user is an admin
        const admin = await getAdmin(req.body.email);
        if (admin) {
          // If the user is an admin call the getUsers function
          const users = await getUsers();
          res.json(users);
        } else {
          res.send(false);
        }
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST - api/users/user/login - Login User
router.post("/user/login", async (req, res) => {
  try {
    const check = await loginUser(req.body);
    const admin = await getAdmin(req.body.email);
    if (check) {
      const accessToken = jwt.sign(
        { email: req.body.email },
        process.env.WEB_TOKEN,
        { expiresIn: "5h" }
      );
      res.json({ accessToken, admin });
    } else {
      res.json({ message: "Wrong email or password! Please try again" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST - api/users/user/signup - post user
router.post("/user/signup", async (req, res) => {
  try {
    const user = await signupUser(req.body);
    const check = await loginUser(req.body);
    const admin = await getAdmin(req.body.email);
    if (check) {
      const accessToken = jwt.sign(
        { email: req.body.email },
        process.env.WEB_TOKEN,
        { expiresIn: "5h" }
      );
      res.json({ accessToken, admin });
    } else {
      res.json({ message: "Wrong email or password! Please try again" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - api/users/user/cart return the cart items
router.post("/user/cart/", async (req, res) => {
  try {
    const bearer = req.headers.authorization.indexOf("Bearer");
    if (bearer === 0 && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      if (decoded.email) {
        const cartItems = await getCartItems(req.body.email);
        res.json(cartItems);
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
        const response = await addToCart(req.body);
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
        await deleteCartItem(req.body.cartItemId);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST - api/users/user/admin/change/
router.post("/user/admin/change/", async (req, res) => {
  try {
    const response = await setAdmin(req.body);
    res.send("User has been set to admin");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
