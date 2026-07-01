let categoriaEditandoIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const tablaCategoriasBody = document.getElementById("categorias-tbody");
  
  if (tablaCategoriasBody) {
    tablaCategoriasBody.addEventListener("click", (evento) => {
      const botonEditar = evento.target.closest(".btn-editar-cat");
      
      if (botonEditar) {
        const index = parseInt(botonEditar.getAttribute("data-index"));
        categoriaEditandoIndex = index;
        abrirModalEditarCategoria(index);
      }
    });
  }

  const formEditarCategoria = document.getElementById("form-editar-categoria");
  if (formEditarCategoria) {
    formEditarCategoria.addEventListener("submit", guardarCambiosCategoria);
  }
});

function abrirModalEditarCategoria(index) {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  let categoria = categorias[index];
  
  if (categoria) {
    categoriaEditandoIndex = index;
    document.getElementById("edit-cat-index").value = index;
    document.getElementById("edit-cat-nombre").value = categoria.nombre;
    document.getElementById("edit-cat-imagen").value = categoria.imagen;

    const modalEl = document.getElementById("editCategoryModal");
    const modalBootstrap = new bootstrap.Modal(modalEl);
    modalBootstrap.show();
  }
}

function guardarCambiosCategoria(evento) {
  evento.preventDefault();
  
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  
  if (categoriaEditandoIndex !== null && categoriaEditandoIndex < categorias.length) {
    let nuevoNombre = document.getElementById("edit-cat-nombre").value.trim();
    let nuevaImagen = document.getElementById("edit-cat-imagen").value.trim();
    
    if (nuevoNombre === "" || nuevaImagen === "") {
      alert("Todos los campos son obligatorios.");
      return;
    }

    categorias[categoriaEditandoIndex].nombre = nuevoNombre;
    categorias[categoriaEditandoIndex].imagen = nuevaImagen;
    
    localStorage.setItem("categorias", JSON.stringify(categorias));
    
    const modalEl = document.getElementById("editCategoryModal");
    const modalBootstrap = bootstrap.Modal.getInstance(modalEl);
    if (modalBootstrap) {
      modalBootstrap.hide();
    }
    
    if (typeof window.renderizarTablaCategorias === "function") {
      window.renderizarTablaCategorias();
    }
    
    if (typeof cargarSelectCategorias === "function") {
      cargarSelectCategorias();
    }
    if (typeof cargarFiltrosCategoriasAdmin === "function") {
      cargarFiltrosCategoriasAdmin();
    }

    const toastMensaje = document.getElementById("toast-msg");
    if (toastMensaje) {
      toastMensaje.innerHTML = "<i class='bi bi-check-circle me-2'></i>Categoría actualizada correctamente.";
      const toastEl = document.getElementById("adminToast");
      new bootstrap.Toast(toastEl).show();
    }
  }
}
