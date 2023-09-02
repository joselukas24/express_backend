const client = require("./client");
const game_data = require("./game_data");

async function insertGame(game) {
  try {
    // Insert query
    const insertQuery = `INSERT INTO games(game_id, title, description, price, sample_cover_image, sample_cover_thumbnail)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    // Values
    const values = [
      game.game_id,
      game.title,
      game.description,
      game.price,
      game.sample_cover.image,
      game.sample_cover.thumbnail_image,
    ];

    // Running query
    console.log(`Inserting ${game.title} into games table...`);
    const result = await client.query(insertQuery, values);
  } catch (error) {
    throw error;
  }
}

async function seedGameData() {
  try {
    // Connecting client
    await client.connect();

    // Calling insertGame for each game object in game_data array
    for (let i = 0; i < game_data.length; i++) {
      await insertGame(game_data[i]);
    }
  } catch (error) {
    throw error;
  }
}

seedGameData()
  .catch(console.error)
  .finally(() => client.end());
