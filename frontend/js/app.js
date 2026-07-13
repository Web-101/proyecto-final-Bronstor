const URL_API = 'http://localhost:3000/api/cartelera';

document.addEventListener('DOMContentLoaded', () => {
  fetch(URL_API)
    .then(respuesta => respuesta.json())
    .then(peliculas => mostrarCartelera(peliculas))
    .catch(error => console.error('Error al cargar las películas:', error));
});

function mostrarCartelera(peliculas) {
  // La película id 1 es la destacada
  const destacada = peliculas.find(pelicula => pelicula.id === 1);
  mostrarDestacada(destacada);

  // El resto va en la grilla
  const enGrilla = peliculas.filter(pelicula => pelicula.id !== 1);
  mostrarGrilla(enGrilla);
}

// Arma la película destacada
function mostrarDestacada(pelicula) {
  const destacada = document.getElementById('destacada');
  if (!pelicula) return;

  // Ponemos la imagen de fondo con el degradado para que se lea el texto
  destacada.style.backgroundImage =
    `linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%), url('${pelicula.poster}')`;

  const horarios = pelicula.funciones.join(' / ');

  destacada.innerHTML = `
    <span class="destacada_etiqueta">Estreno</span>
    <h2 class="destacada_titulo">${pelicula.titulo}</h2>
    <p class="destacada_datos">${pelicula.genero} · ${pelicula.duracion} · ${horarios}</p>
  `;
}

// Arma las tarjetas de la grilla
function mostrarGrilla(peliculas) {
  const grilla = document.querySelector('.grilla');
  grilla.innerHTML = '';

  peliculas.forEach(pelicula => {
    const tarjeta = document.createElement('a');
    tarjeta.href = `detalle.html?id=${pelicula.id}`;
    tarjeta.className = 'tarjeta';

    tarjeta.innerHTML = `
      <img src="${pelicula.poster}" alt="${pelicula.titulo}" class="tarjeta_poster">
      <h3 class="tarjeta_titulo">${pelicula.titulo}</h3>
      <p class="tarjeta_datos">${pelicula.genero} · ${pelicula.duracion}</p>
    `;

    grilla.appendChild(tarjeta);
  });
}