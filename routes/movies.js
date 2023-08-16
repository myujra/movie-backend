const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Guardar película favorita
router.post("/favorites", async (req, res) => {
  try {
    const userId = req.userId;
    const { poster, title, year, director, actors } = req.body;
    const query =
      "INSERT INTO movies (poster, title, year, director, actors, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
    const values = [poster, title, year, director, actors, userId];
    const result = await db.query(query, values);
    res.status(201).json({ movieId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const userId = req.userId;
    const query = "SELECT * FROM movies WHERE user_id = $1 ORDER BY id";
    const result = await db.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/favorites/:movieId", async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.params.movieId;
    const query = "DELETE FROM movies WHERE id = $1 AND user_id = $2";
    const result = await db.query(query, [movieId, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Favorite movie not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
