const client = require("./client");
const game_data = require("./game_data");

async function insertGamePlatform(game, platform) {
  try {
    // Insert query
    const insertQuery = `INSERT INTO game_platforms(game_id, platform_id, first_release_date)
    VALUES($1, $2, $3) RETURNING *`;

    // Values
    const values = [
      game.game_id,
      platform.platform_id,
      platform.first_release_date,
    ];

    // Running query
    console.log(
      `Inserting platform ${platform.platform_name} for ${game.title}`
    );
    const result = await client.query(insertQuery, values);
  } catch (error) {
    throw error;
  }
}

async function seedGamePlatforms() {
  try {
    // Calling insert each platform for each game in the game_array
    for (let i = 0; i < game_data.length; i++) {
      for (let j = 0; j < game_data[i].platforms.length; j++) {
        await insertGamePlatform(game_data[i], game_data[i].platforms[j]);
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = seedGamePlatforms;
