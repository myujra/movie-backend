const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../config/db");

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id";
    const values = [username, first_name, last_name, hashedPassword];

    const result = await db.query(query, values);

    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
