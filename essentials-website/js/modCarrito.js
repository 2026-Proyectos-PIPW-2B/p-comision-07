const Carrito = {

  COSTO_ENVIO: 2000,

  

  actualizarResumen: function() {
    let subtotal = 0;

    document.querySelectorAll(".card[data-precio]").forEach(function(card) {
      const precio = Number(card.dataset.precio);
      const cantidad = Number(card.querySelector(".cantidad").textContent);
      subtotal += precio * cantidad;
    });

    const envio = subtotal > 0 ? Carrito.COSTO_ENVIO : 0;
    const total = subtotal + envio;

    document.getElementById("resumen-subtotal").textContent = "$" + subtotal.toLocaleString("es-AR");
    document.getElementById("resumen-envio").textContent = "$" + envio.toLocaleString("es-AR");
    document.getElementById("resumen-total").textContent = "$" + total.toLocaleString("es-AR");
  },

  init: function() {
    Carrito.actualizarResumen();
  }

};

Carrito.init();