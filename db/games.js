const client = require("./client");

// GET - api/games - get all games
async function getAllGames() {
  try {
    const { rows } = await client.query(`SELECT * FROM games`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - api/games/:platform_id
async function getGamesByPlatform(platform_id) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM games WHERE game_id IN (SELECT game_id FROM game_platforms WHERE platform_id = $1)`,
      [platform_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - api/games/:game_id
async function getGameById(game_id) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM games WHERE game_id = $1`,
      [game_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - api/games/:game_id
async function getGameScreenshots(game_id) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM game_screenshots WHERE game_id = $1`,
      [game_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - api/games/:platform_name
async function getPlatformId(platform_name) {
  try {
    const { rows } = await client.query(
      `SELECT platform_id FROM platforms WHERE platform_name = $1`,
      [platform_name]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllGames,
  getGamesByPlatform,
  getGameById,
  getGameScreenshots,
  getPlatformId,
};
