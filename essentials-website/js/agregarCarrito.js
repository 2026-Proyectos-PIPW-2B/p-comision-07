function vincularBotonesCarrito() {
  document.querySelectorAll(".btn-comprar").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!window.requiereAutenticacion()) return;
      const idProducto = Number(boton.dataset.id);
      CarritoStorage.agregarProducto(idProducto);
      CarritoStorage.actualizarContador();

      const textoOriginal = boton.textContent;
      boton.textContent = "AGREGADO ✓";
      boton.disabled = true;

      setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.disabled = false;
      }, 1000);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  vincularBotonesCarrito();
});
