// ===== DATOS DE LA PELÍCULA =====

// Variable donde guardamos el horario elegido
let funcionElegida = '';

// 1. Leemos el id de la URL; si no está, lo tomamos del pedido guardado
const parametros = new URLSearchParams(window.location.search);
let id = parametros.get('id');

if (!id) {
  const pedidoGuardado = JSON.parse(sessionStorage.getItem('pedido'));
  if (pedidoGuardado && pedidoGuardado.id) {
    id = pedidoGuardado.id;
  }
}

// 2. Pedimos al servidor los datos de ESA película
fetch(`http://localhost:3000/api/cartelera/${id}`)
  .then(respuesta => respuesta.json())
  .then(pelicula => mostrarDetalle(pelicula))
  .catch(error => console.error('Error al cargar el detalle:', error));

// 3. Mostramos los datos en la página
function mostrarDetalle(pelicula) {
  const poster = document.querySelector('.poster_detalle');
  poster.src = pelicula.poster;
  poster.alt = pelicula.titulo;

  document.querySelector('.titulo_detalle').textContent = pelicula.titulo;
  document.querySelector('.meta_detalle').textContent =
    `${pelicula.genero} · ${pelicula.duracion}`;
  document.querySelector('.sinopsis').textContent = pelicula.sinopsis;
  document.querySelector('.titulo_sala').textContent = pelicula.titulo;

  // Horarios (chips)
  const chips = document.querySelector('.chips');
  chips.innerHTML = '';

  pelicula.funciones.forEach((hora, indice) => {
    const chip = document.createElement('a');
    chip.href = '#';
    chip.className = 'chip';
    chip.textContent = hora;

    // El primer horario queda activo por defecto
    if (indice === 0) {
      chip.classList.add('chip_activo');
      funcionElegida = hora;
      document.querySelector('.sub_sala').textContent = `Sala 3 · ${hora}`;
    }

    // Al hacer clic en un horario
    chip.addEventListener('click', (evento) => {
      evento.preventDefault();
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip_activo'));
      chip.classList.add('chip_activo');
      funcionElegida = hora;
      document.querySelector('.sub_sala').textContent = `Sala 3 · ${hora}`;
    });

    chips.appendChild(chip);
  });
}

// ===== SELECCIÓN DE ASIENTOS =====

const PRECIO = 10;
let seleccionados = [];

const filas = document.querySelectorAll('.fila');

filas.forEach(fila => {
  const letra = fila.querySelector('.fila_letra').textContent;
  const asientos = fila.querySelectorAll('.asiento');

  asientos.forEach((asiento, indice) => {
    const numero = indice + 1;
    const codigo = letra + numero;

    asiento.addEventListener('click', () => {
      if (asiento.classList.contains('ocupado')) return;

      if (asiento.classList.contains('elegido')) {
        asiento.classList.remove('elegido');
        seleccionados = seleccionados.filter(c => c !== codigo);
      } else {
        asiento.classList.add('elegido');
        seleccionados.push(codigo);
      }

      actualizarResumen();
    });
  });
});

function actualizarResumen() {
  const valorAsientos = document.querySelector('.resumen_valor');
  const valorTotal = document.querySelector('.resumen_total');

  if (seleccionados.length === 0) {
    valorAsientos.textContent = '—';
    valorTotal.textContent = '0.00 Bs';
    return;
  }

  valorAsientos.textContent = seleccionados.join(', ');
  const total = seleccionados.length * PRECIO;
  valorTotal.textContent = total.toFixed(2) + ' Bs';
}

actualizarResumen();

// ===== BOTÓN CONTINUAR =====

const botonContinuar = document.querySelector('.boton_continuar');

botonContinuar.addEventListener('click', (evento) => {
  evento.preventDefault();

  if (seleccionados.length === 0) {
    alert('Por favor, seleccioná al menos un asiento.');
    return;
  }

  const pedido = {
    id: id,
    pelicula: document.querySelector('.titulo_detalle').textContent,
    funcion: document.querySelector('.sub_sala').textContent,
    asientos: seleccionados,
    total: (seleccionados.length * PRECIO).toFixed(2)
  };
  sessionStorage.setItem('pedido', JSON.stringify(pedido));

  window.location.href = 'formulario.html';
});