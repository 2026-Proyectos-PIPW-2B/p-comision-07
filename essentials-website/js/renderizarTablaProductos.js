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
  if (document.getElementById("products-tbody")) {
    renderizarTablaProductos();
  }
});
