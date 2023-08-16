## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
node app.js
```

### Database

```sh
-- Crear la base de datos
CREATE DATABASE movies_db;

-- Definición de la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Definición de la tabla movies con las nuevas columnas
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    poster TEXT,
    title TEXT NOT NULL,
    year TEXT,
    director TEXT,
    actors TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Índice para mejorar la búsqueda de películas por título
CREATE INDEX idx_movies_title ON movies(title);

-- Índice para mejorar la búsqueda de películas por año
CREATE INDEX idx_movies_year ON movies(year);

```
