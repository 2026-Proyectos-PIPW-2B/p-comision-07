const Carrito = {

  COSTO_ENVIO: 2000,

  sumar: function (idProducto, card, cantidadSpan) {
    const nuevaCantidad = Number(cantidadSpan.textContent) + 1;

    cantidadSpan.textContent = nuevaCantidad;
    CarritoStorage.actualizarCantidad(idProducto, nuevaCantidad);
    Carrito.actualizarResumen();
  },

  restar: function (idProducto, card, cantidadSpan) {
    const cantidadActual = Number(cantidadSpan.textContent);

    if (cantidadActual > 1) {
      const nuevaCantidad = cantidadActual - 1;
      cantidadSpan.textContent = nuevaCantidad;
      CarritoStorage.actualizarCantidad(idProducto, nuevaCantidad);
      Carrito.actualizarResumen();
    }
  },

  eliminar: function (idProducto, card) {
    card.remove();
    CarritoStorage.eliminarProducto(idProducto);
    Carrito.actualizarResumen();
    Carrito.mostrarMensajeSiVacio();
  },

  actualizarResumen: function () {
    let subtotal = 0;

    document.querySelectorAll(".card[data-precio]").forEach(function (card) {
      const precio = Number(card.dataset.precio);
      const cantidad = Number(card.querySelector(".cantidad").textContent);
      subtotal += precio * cantidad;
    });

    let envio;
    if (subtotal > 0) {
      envio = Carrito.COSTO_ENVIO;
    } else {
      envio = 0;
    }
    const total = subtotal + envio;

    document.getElementById("resumen-subtotal").textContent = "$" + subtotal.toLocaleString("es-AR");
    document.getElementById("resumen-envio").textContent = "$" + envio.toLocaleString("es-AR");
    document.getElementById("resumen-total").textContent = "$" + total.toLocaleString("es-AR");
  },

  mostrarMensajeSiVacio: function () {
    const contenedor = document.getElementById("contenedor-carrito");
    if (contenedor && contenedor.children.length === 0) {
      contenedor.innerHTML = `<p class="text-muted text-center py-5">Tu carrito está vacío.</p>`;
    }
  },

  init: function () {
    Carrito.actualizarResumen();
    CarritoStorage.actualizarContador();
  },

};