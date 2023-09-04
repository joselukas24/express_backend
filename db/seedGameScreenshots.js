const client = require("./client");
const game_data = require("./game_data");

async function insertScreenshot(game, screenshot) {
  try {
    // Insert query
    const insertQuery = `INSERT INTO game_screenshots(game_id, caption, image, thumbnail_image)
    VALUES($1, $2, $3, $4)
    RETURNING *`;

    // Values
    const values = [
      game.game_id,
      screenshot.caption,
      screenshot.image,
      screenshot.thumbnail_image,
    ];

    // Running query
    console.log(`Inserting screenshot for ${game.title}...`);
    const result = await client.query(insertQuery, values);
  } catch (error) {
    throw error;
  }
}

async function seedGameScreenshots() {
  try {
    // Calling insertScreenshot for each game and each screenshot in the game_array
    for (let i = 0; i < game_data.length; i++) {
      for (let j = 0; j < game_data[i].sample_screenshots.length; j++) {
        await insertScreenshot(
          game_data[i],
          game_data[i].sample_screenshots[j]
        );
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = seedGameScreenshots;
