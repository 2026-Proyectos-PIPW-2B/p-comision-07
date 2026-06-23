document.addEventListener("DOMContentLoaded", () => {
  const usersTbody = document.getElementById("users-tbody");

  if (usersTbody) {
    usersTbody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".btn-eliminar-usuario");
      if (deleteBtn) {
        const userId = parseInt(deleteBtn.getAttribute("data-id"));
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const user = usuarios.find(u => u.id === userId);
        if (!user) return;

        // Diálogo de confirmación nativo
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.nombre}"?`)) {
          const nuevosUsuarios = usuarios.filter(u => u.id !== userId);
          localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

          // Actualizar estadísticas globales y re-renderizar tabla si los métodos existen
          if (typeof window.actualizarEstadisticas === "function") {
            window.actualizarEstadisticas();
          }
          if (typeof window.renderizarTablaUsuarios === "function") {
            window.renderizarTablaUsuarios();
          }
        }
      }
    });
  }
});
