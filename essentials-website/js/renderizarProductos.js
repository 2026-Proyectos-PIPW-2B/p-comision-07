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

    let stockInfo;
    if (window.obtenerInfoStock) {
      stockInfo = window.obtenerInfoStock(producto.cantidadStock);
    } else {
      stockInfo = { textoTag: "Stock desconocido", clase: "text-muted", cantidad: producto.cantidadStock };
    }
    const sinStock = stockInfo.cantidad === 0;

    let opacidadImagen = "";
    if (sinStock) {
      opacidadImagen = "opacity-25";
    }

    let badgeDescuento = "";
    if (producto.descuento) {
      badgeDescuento = `<span class="badge rounded-pill bg-dark mb-1 px-3 py-2">${producto.descuento}</span>`;
    }

    let badgeSinStock = "";
    if (sinStock) {
      badgeSinStock = `<span class="badge rounded-pill bg-secondary px-3 py-2">SIN STOCK</span>`;
    }

    let clasesBoton = "btn-dark btn-comprar";
    if (sinStock) {
      clasesBoton = "btn-secondary";
    }

    let textoBoton = "AÑADIR AL CARRITO";
    if (sinStock) {
      textoBoton = "SIN STOCK";
    }

    let disabledProp = "";
    if (sinStock) {
      disabledProp = "disabled";
    }

    cardCol.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
              <div class="position-absolute top-0 start-0 m-3 z-1 d-flex flex-column align-items-start">
                ${badgeDescuento}
                ${badgeSinStock}
              </div>
              <div class="ratio ratio-1x1 bg-light">
                <img
                  src="${producto.imagen}"
                  class="object-fit-cover w-100 h-100 ${opacidadImagen}"
                  alt="${producto.nombre}"
                />
              </div>
              <div class="card-body text-center d-flex flex-column bg-white p-4">
                <p class="text-muted small text-uppercase mb-1">${producto.categoria}</p>
                <h5 class="card-title fw-bold text-uppercase mb-2">${producto.nombre}</h5>
                <p class="text-dark small mb-1 fw-bold">Unidades: ${stockInfo.cantidad}</p>
                <p class="${stockInfo.clase} small mb-3 fw-bold">${stockInfo.textoTag}</p>
                <p class="card-text fs-4 mb-4 fw-semibold text-dark">$${producto.precio.toLocaleString()}</p>
                <button
                  class="btn ${clasesBoton} rounded-pill fw-bold mt-auto w-100 py-2"
                  data-id="${producto.id}"
                  ${disabledProp}
                >
                  ${textoBoton}
                </button>
              </div>
            </div>
        `;

    contenedor.appendChild(cardCol);
  });

  vincularBotonesCarrito();
}

document.addEventListener("DOMContentLoaded", () => renderizarProductos());
