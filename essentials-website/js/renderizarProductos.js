function renderizarProductos(listaProductos) {
  const contenedor = document.getElementById("contenedor-productos");
  const productosAMostrar = listaProductos || JSON.parse(localStorage.getItem("productos"));

  if (!contenedor || !productosAMostrar) return;

  contenedor.innerHTML = "";

  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = `<div class="col-12 text-center py-5">
      <p class="fs-4 text-muted">No se encontraron productos que coincidan con tu búsqueda.</p>
    </div>`;
    return;
  }

  productosAMostrar.forEach((producto) => {
    const cardCol = document.createElement("div");
    cardCol.className = "col";

    cardCol.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
              <span class="badge rounded-pill bg-dark position-absolute top-0 start-0 m-3 z-1 px-3 py-2">${producto.descuento}</span>
              <div class="ratio ratio-1x1">
                <img
                  src="${producto.imagen}"
                  class="object-fit-cover w-100 h-100"
                  alt="${producto.nombre}"
                />
              </div>
              <div class="card-body text-center d-flex flex-column bg-white p-4">
                <p class="text-muted small text-uppercase mb-1">${producto.categoria}</p>
                <h5 class="card-title fw-bold text-uppercase mb-2">${producto.nombre}</h5>
                <p class="${producto.claseStock} small mb-3 fw-bold">${producto.estadoStock}</p>
                <p class="card-text fs-4 mb-4 fw-semibold text-dark">$${producto.precio.toLocaleString()}</p>
                <button
                  class="btn btn-dark rounded-pill fw-bold mt-auto w-100 btn-comprar py-2"
                  data-id="${producto.id}"
                >
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
        `;

    contenedor.appendChild(cardCol);
  });

  vincularBotonesCarrito();
}

document.addEventListener("DOMContentLoaded", () => renderizarProductos());
