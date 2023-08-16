const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// JWT secret key
const JWT_SECRET = "examen-2023";

// Middleware para verificar el token JWT en rutas protegidas
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}

// routes auth
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// routes movies
const movieRoutes = require("./routes/movies");
app.use("/api/movies", verifyToken, movieRoutes);

// routes users
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
