document.addEventListener("DOMContentLoaded", () => {
  const btnPrevisualizar = document.getElementById("btn-previsualizar");
  const previewCardContainer = document.getElementById("preview-card-container");

  if (btnPrevisualizar && previewCardContainer) {
    btnPrevisualizar.addEventListener("click", () => {
      // Obtener datos del formulario de producto
      const nombre = document.getElementById("prod-nombre").value.trim() || "Producto de Prueba";
      const categoria = document.getElementById("prod-categoria").value || "Categoría";
      
      const stockVal = document.getElementById("prod-stock").value;
      let estadoStock = "Stock alto";
      let claseStock = "text-success";
      if (stockVal === "medio") {
        estadoStock = "Stock medio";
        claseStock = "text-warning";
      } else if (stockVal === "ultimas") {
        estadoStock = "Últimas unidades";
        claseStock = "text-danger";
      }

      const precioVal = parseFloat(document.getElementById("prod-precio").value) || 0;
      
      const descVal = parseInt(document.getElementById("prod-descuento").value) || 0;
      const descuento = descVal > 0 ? `-${descVal}% OFF` : "";

      const imgNombre = document.getElementById("prod-img-nombre").value.trim() || "placeholder";
      const imgFormato = document.getElementById("prod-img-formato").value || ".webp";
      const imagen = `img/${imgNombre}${imgFormato}`;

      // Crear HTML usando el literal template coincidente con productos.html/renderizarProductos.js
      const descuentoHtml = descuento 
        ? `<span class="badge rounded-pill bg-dark position-absolute top-0 start-0 m-3 z-1 px-3 py-2">${descuento}</span>`
        : "";

      const cardHtml = `
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative w-100" style="max-width: 290px;">
          ${descuentoHtml}
          <div class="ratio ratio-1x1">
            <img
              src="${imagen}"
              class="object-fit-cover w-100 h-100"
              alt="${nombre}"
            />
          </div>
          <div class="card-body text-center d-flex flex-column bg-white p-4">
            <p class="text-muted small text-uppercase mb-1">${categoria}</p>
            <h5 class="card-title fw-bold text-uppercase mb-2">${nombre}</h5>
            <p class="${claseStock} small mb-3 fw-bold">${estadoStock}</p>
            <p class="card-text fs-4 mb-4 fw-semibold text-dark">$${precioVal.toLocaleString("es-AR")}</p>
            <button class="btn btn-dark rounded-pill fw-bold mt-auto w-100 py-2" disabled>
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      `;

      // Inyectar en el contenedor y mostrar modal
      previewCardContainer.innerHTML = cardHtml;
      
      const modalEl = document.getElementById("previewModal");
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      }
    });
  }
});
