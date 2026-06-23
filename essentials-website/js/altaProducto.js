document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("form-producto");

  if (formProducto) {
    formProducto.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("prod-nombre").value.trim();
      const categoria = document.getElementById("prod-categoria").value;
      const stockVal = document.getElementById("prod-stock").value;
      const precioVal = parseFloat(document.getElementById("prod-precio").value);
      const descVal = parseInt(document.getElementById("prod-descuento").value) || 0;
      const imgNombre = document.getElementById("prod-img-nombre").value.trim();
      const imgFormato = document.getElementById("prod-img-formato").value;

      // Validación simple
      if (!nombre || !categoria || !stockVal || isNaN(precioVal) || precioVal <= 0 || !imgNombre || !imgFormato) {
        alert("Por favor completá todos los campos requeridos correctamente.");
        return;
      }

      if (descVal < 0 || descVal > 100) {
        alert("El descuento debe ser un porcentaje válido entre 0 y 100.");
        return;
      }

      // Mapear stock a estados e íconos de stock
      let estadoStock = "Stock alto";
      let claseStock = "text-success";
      if (stockVal === "medio") {
        estadoStock = "Stock medio";
        claseStock = "text-warning";
      } else if (stockVal === "ultimas") {
        estadoStock = "Últimas unidades";
        claseStock = "text-danger";
      }

      // Formatear descuento
      const descuento = descVal > 0 ? `-${descVal}% OFF` : "";

      // Crear ruta de imagen
      const imagen = `img/${imgNombre}${imgFormato}`;

      // Obtener base de productos y agregar el nuevo
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      const nuevoProducto = {
        id: Date.now(), // Utiliza Date.now() para generar un id automático único
        categoria: categoria,
        nombre: nombre,
        estadoStock: estadoStock,
        precio: precioVal,
        imagen: imagen,
        descuento: descuento,
        claseStock: claseStock
      };

      productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(productos));

      alert("Producto subido con éxito.");

      // Limpiar formulario
      formProducto.reset();

      // Recargar datos y estadísticas
      if (typeof renderizarTablaProductos === "function") {
        renderizarTablaProductos();
      }
      if (typeof window.actualizarEstadisticas === "function") {
        window.actualizarEstadisticas();
      }

      // Redirigir a la pestaña de inventario de productos
      const tabEl = document.querySelector('#adminTabs a[data-bs-target="#tab-inventario"]');
      if (tabEl) {
        const tab = new bootstrap.Tab(tabEl);
        tab.show();
      }
    });
  }
});
