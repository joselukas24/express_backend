const express = require("express");
const app = express();
const PORT = 3000;

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

// Starting server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
