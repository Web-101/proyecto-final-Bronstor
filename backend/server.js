// Importamos Express (la librería que instalamos)
const express = require('express');
const cors = require('cors');

// Importamos los datos de las películas desde el JSON
const cartelera = require('./cartelera.json');

// Creamos la aplicación del servidor
const app = express();
app.use(cors());


// Puerto donde va a escuchar el servidor
const PUERTO = 3000;

// ===== ENDPOINT 1: lista completa de películas =====
app.get('/api/cartelera', (req, res) => {
  res.json(cartelera);
});

// ===== ENDPOINT 2: una sola película por su id =====
app.get('/api/cartelera/:id', (req, res) => {
  const id = Number(req.params.id);
  const pelicula = cartelera.find(p => p.id === id);

  if (pelicula) {
    res.json(pelicula);
  } else {
    res.status(404).json({ error: 'Película no encontrada' });
  }
});

// Encendemos el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor funcionando en http://localhost:${PUERTO}`);
});