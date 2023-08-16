const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../config/db");

// JWT secret key
const JWT_SECRET = "examen-2023";

// Inicio de sesión de usuario
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT id, password FROM users WHERE username = $1";
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
