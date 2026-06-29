function renderizarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  if (!contenedor) return;

  const carrito = CarritoStorage.obtener();
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-muted text-center py-5">Tu carrito está vacío.</p>`;
    return;
  }

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return;

    const card = document.createElement("div");
    card.className = "card border-0 shadow-sm rounded-3 mb-3 p-3";
    card.dataset.id = producto.id;
    card.dataset.precio = producto.precio;

    card.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          class="rounded-3 object-fit-cover"
          style="width: 80px; height: 80px"
        />
        <div class="flex-grow-1">
          <p class="fw-semibold mb-1">${producto.nombre}</p>
          <p class="text-muted mb-0">$${producto.precio.toLocaleString("es-AR")}</p>
        </div>
        <button class="btn btn-link text-danger fs-5 p-0 btn-eliminar-item" type="button">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="d-flex justify-content-end align-items-center gap-3 mt-3">
        <button
          class="btn btn-outline-secondary btn-sm rounded-circle btn-restar"
          type="button"
          style="width: 32px; height: 32px; padding: 0"
        >
          <i class="bi bi-dash"></i>
        </button>
        <span class="fw-semibold cantidad">${item.cantidad}</span>
        <button
          class="btn btn-outline-secondary btn-sm rounded-circle btn-sumar"
          type="button"
          style="width: 32px; height: 32px; padding: 0"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
    `;

    const cantidadSpan = card.querySelector(".cantidad");
    const botonSumar = card.querySelector(".btn-sumar");
    const botonRestar = card.querySelector(".btn-restar");
    const botonEliminar = card.querySelector(".btn-eliminar-item");

    botonSumar.addEventListener("click", () => {
      Carrito.sumar(producto.id, card, cantidadSpan);
    });

    botonRestar.addEventListener("click", () => {
      Carrito.restar(producto.id, card, cantidadSpan);
    });

    botonEliminar.addEventListener("click", () => {
      Carrito.eliminar(producto.id, card);
    });

    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  Carrito.init();
});
