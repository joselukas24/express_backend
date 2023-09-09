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

// Get - api/games/game/title/:game_title
async function getGameByTitle(game_title) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM games WHERE title = $1`,
      [game_title]
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
      `SELECT 
      g.game_id,
      g.description,
      g.title,
      g.price,
      g.sample_cover_image,
      gs.caption,
      gs.image
  FROM 
      games g
  JOIN 
      game_screenshots gs ON g.game_id = gs.game_id
  WHERE 
      g.game_id = $1`,
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
  getGameByTitle,
  getGameScreenshots,
  getPlatformId,
};
