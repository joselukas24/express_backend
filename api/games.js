const express = require("express");
const router = express.Router();

const {
  getAllGames,
  getAllAvailableGames,
  getGamesByPlatform,
  getGameById,
  getGameByTitle,
  getGameScreenshots,
  getPlatformId,
  deleteGame,
} = require("../db/games");

// GET - api/games - get all games
router.get("/", async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    throw error;
  }
});

// GET - api/games/available - get all available games
router.get("/available", async (req, res) => {
  try {
    const games = await getAllAvailableGames();
    res.json(games);
  } catch (error) {
    throw error;
  }
});

// GET - api/games/game/title/:game_id
router.get("/game/title/:game_id", async (req, res) => {
  try {
    const game = await getGameById(req.params.game_id);
    res.send(game);
  } catch (error) {
    throw error;
  }
});

// GET - api/games/:game_id
router.get("/game/:game_id", async (req, res) => {
  try {
    const game_screenshots = await getGameScreenshots(req.params.game_id);
    res.send(game_screenshots);
  } catch (error) {
    throw error;
  }
});

// GET - api/game/title/:game_title
router.get("/game/title/:game_title", async (req, res) => {
  try {
    const game = await getGameByTitle(req.params.game_title);
    res.send(game);
  } catch (error) {
    throw error;
  }
});

// DELETE - api/games/game/delete/:game_title
router.delete("/game/delete/:game_id", async (req, res) => {
  try {
    const response = await deleteGame(req.params.game_id);
    res.send("Game deleted");
  } catch (error) {
    throw error;
  }
});

// GET - api/games/:platform_name
router.get("/platform/name/:platform_name", async (req, res) => {
  try {
    const platform_id = await getPlatformId(req.params.platform_name);
    const games = await getGamesByPlatform(platform_id[0].platform_id);
    res.json(games);
  } catch (error) {
    throw error;
  }
});

// GET - api/games/:platform_id
router.get("/platform/:platform_id", async (req, res, next) => {
  try {
    const games = await getGamesByPlatform(req.params.platform_id);
    res.send(games);
  } catch (error) {
    throw error;
  }
});
module.exports = router;
