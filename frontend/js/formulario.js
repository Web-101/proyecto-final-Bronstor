// Recuperamos el pedido guardado
const pedido = JSON.parse(sessionStorage.getItem('pedido'));

// Si no hay pedido (entraron directo), volvemos al inicio
if (!pedido) {
  window.location.href = 'index.html';
}

// Mostramos el resumen del pedido
document.getElementById('r_pelicula').textContent = pedido.pelicula;
document.getElementById('r_funcion').textContent = pedido.funcion;
document.getElementById('r_asientos').textContent = pedido.asientos.join(', ');
document.getElementById('r_total').textContent = pedido.total + ' Bs';

// Cuando envían el formulario
const form = document.getElementById('form_compra');

form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();

  // Validación simple (nombre y correo obligatorios)
  if (nombre === '' || correo === '') {
    alert('Por favor, completá tu nombre y correo.');
    return;
  }

  // Guardamos el nombre para la confirmación
  pedido.nombre = nombre;
  sessionStorage.setItem('pedido', JSON.stringify(pedido));

  // Vamos a la confirmación
  window.location.href = 'confirmacion.html';
});