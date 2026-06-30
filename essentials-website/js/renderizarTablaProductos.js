function renderizarTablaProductos(listaProductos) {
  const tbody = document.getElementById("products-tbody");
  const productosAMostrar = listaProductos || JSON.parse(localStorage.getItem("productos"));

  if (!tbody || !productosAMostrar) return;

  tbody.innerHTML = "";

  productosAMostrar.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="fw-bold text-center">${producto.id}</td>
      <td class="text-center">${producto.nombre}</td>
      <td class="text-center">${producto.categoria}</td>
      <td class="text-center">$${producto.precio.toLocaleString()}</td>
      <td class="text-center">
        <span class="badge ${producto.claseStock.replace('text-', 'bg-')}">${producto.estadoStock}</span>
      </td>
      <td class="text-center"><code class="small text-muted">${producto.imagen.split('/').pop()}</code></td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${producto.id}"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const productsTbody = document.getElementById("products-tbody");
  if (productsTbody) {
    renderizarTablaProductos();
    
    productsTbody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".btn-eliminar");
      if (deleteBtn) {
        const productId = parseInt(deleteBtn.getAttribute("data-id"));
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = productos.find(p => p.id === productId);
        
        if (!producto) return;
        
        if (confirm(`¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?`)) {
          const nuevosProductos = productos.filter(p => p.id !== productId);
          localStorage.setItem("productos", JSON.stringify(nuevosProductos));
          
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
          const nuevoCarrito = carrito.filter(item => item.id !== productId);
          localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
          
          if (typeof CarritoStorage !== "undefined" && typeof CarritoStorage.actualizarContador === "function") {
            CarritoStorage.actualizarContador();
          }

          renderizarTablaProductos();
          if (typeof window.actualizarEstadisticas === "function") {
            window.actualizarEstadisticas();
          }
        }
      }
    });
  }
});
