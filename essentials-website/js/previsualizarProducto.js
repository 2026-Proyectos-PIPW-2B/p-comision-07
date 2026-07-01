document.addEventListener("DOMContentLoaded", () => {
  const btnPrevisualizar = document.getElementById("btn-previsualizar");
  const previewCardContainer = document.getElementById("preview-card-container");

  if (btnPrevisualizar && previewCardContainer) {
    btnPrevisualizar.addEventListener("click", () => {
      const nombre = document.getElementById("prod-nombre").value.trim() || "Producto de Prueba";
      const categoria = document.getElementById("prod-categoria").value || "Categoría";
      
      const stockVal = parseInt(document.getElementById("prod-stock").value) || 0;
      let stockInfo;
      if (window.obtenerInfoStock) {
        stockInfo = window.obtenerInfoStock(stockVal);
      } else {
        stockInfo = { textoTag: "Stock alto", clase: "text-success", cantidad: stockVal };
      }

      let descuento = "";
      
      const precioVal = parseFloat(document.getElementById("prod-precio").value) || 0;
      
      const descVal = parseInt(document.getElementById("prod-descuento").value) || 0;
      if (descVal > 0) {
        descuento = `-${descVal}% OFF`;
      }

      const imgNombre = document.getElementById("prod-img-nombre").value.trim() || "placeholder";
      const imgFormato = document.getElementById("prod-img-formato").value || ".webp";
      const imagen = `img/${imgNombre}${imgFormato}`;

      const sinStock = stockInfo.cantidad === 0;

      let opacidadImagen = "";
      if (sinStock) {
        opacidadImagen = "opacity-25";
      }

      let badgeDescuento = "";
      if (descuento) {
        badgeDescuento = `<span class="badge rounded-pill bg-dark mb-1 px-3 py-2">${descuento}</span>`;
      }

      let badgeSinStock = "";
      if (sinStock) {
        badgeSinStock = `<span class="badge rounded-pill bg-secondary px-3 py-2">SIN STOCK</span>`;
      }

      let clasesBoton = "btn-dark";
      if (sinStock) {
        clasesBoton = "btn-secondary";
      }

      let textoBoton = "AÑADIR AL CARRITO";
      if (sinStock) {
        textoBoton = "SIN STOCK";
      }

      const cardHtml = `
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative w-100" style="max-width: 290px;">
          <div class="position-absolute top-0 start-0 m-3 z-1 d-flex flex-column align-items-start">
            ${badgeDescuento}
            ${badgeSinStock}
          </div>
          <div class="ratio ratio-1x1 bg-light">
            <img
              src="${imagen}"
              class="object-fit-cover w-100 h-100 ${opacidadImagen}"
              alt="${nombre}"
            />
          </div>
          <div class="card-body text-center d-flex flex-column bg-white p-4">
            <p class="text-muted small text-uppercase mb-1">${categoria}</p>
            <h5 class="card-title fw-bold text-uppercase mb-2">${nombre}</h5>
            <p class="text-dark small mb-1 fw-bold">Unidades: ${stockInfo.cantidad}</p>
            <p class="${stockInfo.clase} small mb-3 fw-bold">${stockInfo.textoTag}</p>
            <p class="card-text fs-4 mb-4 fw-semibold text-dark">$${precioVal.toLocaleString("es-AR")}</p>
            <button class="btn ${clasesBoton} rounded-pill fw-bold mt-auto w-100 py-2" disabled>
              ${textoBoton}
            </button>
          </div>
        </div>
      `;

      previewCardContainer.innerHTML = cardHtml;
      
      const modalEl = document.getElementById("previewModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    });
  }
});
