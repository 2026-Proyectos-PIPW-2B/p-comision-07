document.addEventListener("DOMContentLoaded", () => {
  const usersTbody = document.getElementById("users-tbody");

  if (usersTbody) {
    usersTbody.addEventListener("change", (e) => {
      if (e.target.classList.contains("switch-bloqueo")) {
        const userId = parseInt(e.target.getAttribute("data-id"));
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const userIdx = usuarios.findIndex(u => u.id === userId);
        if (userIdx !== -1) {
          // Cambiar estado bloqueado
          usuarios[userIdx].bloqueado = e.target.checked;
          localStorage.setItem("usuarios", JSON.stringify(usuarios));

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
