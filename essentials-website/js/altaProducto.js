document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("form-producto");

  if (formProducto) {
    formProducto.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("prod-nombre").value.trim();
      const categoria = document.getElementById("prod-categoria").value;
      
      const stockInput = document.getElementById("prod-stock").value.trim();
      const precioInput = document.getElementById("prod-precio").value.trim();
      
      const descuentoInput = document.getElementById("prod-descuento").value.trim();
      let descVal = 0;

      const imgNombre = document.getElementById("prod-img-nombre").value.trim();
      const imgFormato = document.getElementById("prod-img-formato").value;

      // Validación estricta con array de errores
      const errores = [];

      if (!nombre) errores.push("El nombre del producto no puede estar vacío.");
      if (!categoria) errores.push("Tenés que seleccionar una categoría.");
      
      if (!stockInput) {
        errores.push("El stock no puede estar vacío.");
      } else {
        const stockVal = parseInt(stockInput);
        if (isNaN(stockVal) || stockVal < 0) {
          errores.push("El stock no puede ser negativo.");
        }
      }

      if (!precioInput) {
        errores.push("El precio no puede estar vacío.");
      } else {
        const precioVal = parseFloat(precioInput);
        if (isNaN(precioVal) || precioVal <= 0) {
          errores.push("El precio debe ser un número mayor a 0.");
        }
      }

      if (descuentoInput !== "") {
        descVal = parseInt(descuentoInput);
        if (isNaN(descVal) || descVal < 1 || descVal > 100) {
          errores.push("El porcentaje de descuento debe estar entre 1 y 100.");
        }
      }

      if (!imgNombre) errores.push("Tenés que ingresar el nombre de la imagen.");
      if (!imgFormato) errores.push("Tenés que seleccionar el formato de la imagen.");

      const contenedorErrores = document.getElementById("errores-producto");
      const listaErrores = document.getElementById("lista-errores-producto");

      if (errores.length > 0) {
        listaErrores.innerHTML = "";
        errores.forEach(err => {
          const li = document.createElement("li");
          li.textContent = err;
          listaErrores.appendChild(li);
        });
        contenedorErrores.classList.remove("d-none");
        return;
      } else {
        if (contenedorErrores) {
          contenedorErrores.classList.add("d-none");
        }
      }



      // Formatear descuento
      let descuento = "";
      if (descVal > 0) {
        descuento = `-${descVal}% OFF`;
      }

      // Crear ruta de imagen
      const imagen = `img/${imgNombre}${imgFormato}`;

      // Obtener base de productos y agregar el nuevo
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      const nuevoProducto = {
        id: Date.now(), // Utiliza Date.now() para generar un id automático único
        categoria: categoria,
        nombre: nombre,
        cantidadStock: parseInt(stockInput),
        precio: parseFloat(precioInput),
        imagen: imagen,
        descuento: descuento
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
