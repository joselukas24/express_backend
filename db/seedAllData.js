const client = require("./client");
const seedGameData = require("./seedGameData");
const seedPlatformData = require("./seedPlatformData");

const seedGamePlatforms = require("./seedGamePlatforms");
const seedGameScreenshots = require("./seedGameScreenshots");

async function seedAllData() {
  try {
    // Connect client
    client.connect();

    // Begin Transaction
    await client.query("BEGIN");

    // Seed all tables
    await seedGameData();
    await seedPlatformData();
    await seedGamePlatforms();
    await seedGameScreenshots();

    // Commit Transaction
    await client.query("COMMIT");
  } catch (error) {
    // Rollback if there's any error
    await client.query("ROLLBACK");
    throw error;
  }
}

seedAllData()
  .catch(console.error)
  .finally(() => client.end());
