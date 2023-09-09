const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

// JSON parser
app.use(express.json());

// init cors
const cors = require("cors");
app.use(cors());

// init db client
const client = require("./db/client");
client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error(error);
  });

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Connected to the backend" });
});

// Router: /api
app.use("/api", require("./api"));

// Starting server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
