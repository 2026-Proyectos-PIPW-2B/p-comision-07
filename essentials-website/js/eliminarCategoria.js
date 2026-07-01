document.addEventListener("DOMContentLoaded", () => {
  const tablaCategoriasBody = document.getElementById("categorias-tbody");

  if (tablaCategoriasBody) {
    tablaCategoriasBody.addEventListener("click", (e) => {
      const btnEliminar = e.target.closest(".btn-eliminar-cat");
      if (btnEliminar) {
        const index = btnEliminar.getAttribute("data-index");
        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        
        const catEliminada = categorias[index];
        if (!catEliminada) return;

        const confirmacion = confirm(`¿Estás seguro de eliminar la categoría "${catEliminada.nombre}"?`);
        if (!confirmacion) return;

        categorias.splice(index, 1);
        localStorage.setItem("categorias", JSON.stringify(categorias));
        
        alert("Categoría eliminada correctamente.");

        if (typeof window.renderizarTablaCategorias === "function") {
          window.renderizarTablaCategorias();
        }
        
        if (typeof cargarSelectCategorias === "function") {
          cargarSelectCategorias();
        }
        if (typeof cargarFiltrosCategoriasAdmin === "function") {
          cargarFiltrosCategoriasAdmin();
        }
      }
    });
  }
});
