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

// Get all tables
const getTables = require("./db/getTables");
app.get("/", async (req, res) => {
  try {
    const tables = await getTables();
    res.json(tables.rows);
  } catch (error) {
    res.status(500).send(`Error fetching the tables: ${error.message}`);
  }
});

// Drop all tables
const dropAllTables = require("./db/dropAllTables");
app.get("/drop-tables", async (req, res) => {
  try {
    await dropAllTables();
    res.send("All tables dropeed successfully");
  } catch (error) {
    res.status(500).send(`Error dropping tables: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
