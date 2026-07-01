document.addEventListener("DOMContentLoaded", () => {
  const formCategoria = document.getElementById("form-nueva-categoria");
  if (!formCategoria) return;

  const inputCategoria = document.getElementById("nueva-categoria-nombre");
  const tablaCategoriasBody = document.getElementById("categorias-tbody");

  window.renderizarTablaCategorias = function() {
    if (!tablaCategoriasBody) return;
    
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    tablaCategoriasBody.innerHTML = "";

    if (categorias.length === 0) {
      tablaCategoriasBody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-muted py-4">No hay categorías cargadas.</td>
        </tr>
      `;
      return;
    }

    categorias.forEach((cat, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="text-center align-middle fw-medium">${cat.nombre}</td>
        <td class="text-center align-middle"><code class="small text-muted">${cat.imagen}</code></td>
        <td class="text-center align-middle">
          <button class="btn btn-sm btn-outline-primary btn-editar-cat" data-index="${index}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger btn-eliminar-cat" data-index="${index}" title="Eliminar">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tablaCategoriasBody.appendChild(tr);
    });
  };



  window.renderizarTablaCategorias();

  formCategoria.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = inputCategoria.value.trim();

    const imgName = document.getElementById("nueva-categoria-img").value.trim();
    const imgExt = document.getElementById("nueva-categoria-formato").value;

    if (nombre === "" || imgName === "") {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    
    const existe = categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (existe) {
      alert("La categoría ya existe.");
      return;
    }

    const nuevaCategoria = {
      nombre: nombre,
      imagen: imgName + imgExt
    };

    categorias.push(nuevaCategoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    
    inputCategoria.value = "";
    document.getElementById("nueva-categoria-img").value = "";
    alert("Categoría agregada con éxito.");
    
    window.renderizarTablaCategorias();
    
    if (typeof cargarSelectCategorias === "function") {
      cargarSelectCategorias();
    }
    if (typeof cargarFiltrosCategoriasAdmin === "function") {
      cargarFiltrosCategoriasAdmin();
    }
  });

});
