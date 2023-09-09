const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

// ROUTER: /api/games
router.use("/games", require("./games"));

// ROUTER: /api/users
router.use("/users", require("./users"));

module.exports = router;
