// Recuperamos el pedido guardado
const pedido = JSON.parse(sessionStorage.getItem('pedido'));

// Si no hay pedido, volvemos al inicio
if (!pedido) {
  window.location.href = 'index.html';
}

// Mensaje personalizado con el nombre
document.getElementById('gracias').textContent = `¡Gracias por tu compra, ${pedido.nombre}!`;

// Llenamos el ticket
document.getElementById('t_pelicula').textContent = pedido.pelicula;
document.getElementById('t_funcion').textContent = pedido.funcion;
document.getElementById('t_asientos').textContent = pedido.asientos.join(', ');
document.getElementById('t_total').textContent = pedido.total + ' Bs';

// Limpiamos la memoria (la compra ya terminó)
sessionStorage.removeItem('pedido');