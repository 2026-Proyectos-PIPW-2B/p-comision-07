// Exponer función global para actualizar las estadísticas del dashboard
window.actualizarEstadisticas = function () {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const statProductos = document.getElementById("stat-productos");
  const statTotal = document.getElementById("stat-total");
  const statEnabled = document.getElementById("stat-enabled");
  const statDisabled = document.getElementById("stat-disabled");

  if (statProductos) statProductos.textContent = productos.length;
  if (statTotal) statTotal.textContent = usuarios.length;
  if (statEnabled)
    statEnabled.textContent = usuarios.filter((u) => !u.bloqueado).length;
  if (statDisabled)
    statDisabled.textContent = usuarios.filter((u) => u.bloqueado).length;
};

document.addEventListener("DOMContentLoaded", () => {

  // Cargar estadísticas iniciales
  window.actualizarEstadisticas();

  // Gestión de la pestaña de Seguridad
  const autoLogoutToggle = document.getElementById("auto-logout-toggle");
  const sessionTimer = document.getElementById("session-timer");
  const btnGuardarSeguridad = document.getElementById("btn-guardar-seguridad");

  if (autoLogoutToggle && sessionTimer && btnGuardarSeguridad) {
    // Cargar config guardada o usar valores por defecto
    const configSeguridad = JSON.parse(
      localStorage.getItem("configSeguridad"),
    ) || {
      autoLogout: true,
      tiempo: "30",
    };

    autoLogoutToggle.checked = configSeguridad.autoLogout;
    sessionTimer.value = configSeguridad.tiempo;

    const actualizarVisibilidadTimer = () => {
      const timerOptions = document.getElementById("timer-options");
      if (timerOptions) {
        timerOptions.style.display = autoLogoutToggle.checked
          ? "block"
          : "none";
      }
    };

    // Inicializar visibilidad y escuchar cambios en el toggle
    actualizarVisibilidadTimer();
    autoLogoutToggle.addEventListener("change", actualizarVisibilidadTimer);

    // Guardar cambios en LocalStorage
    btnGuardarSeguridad.addEventListener("click", () => {
      const nuevaConfig = {
        autoLogout: autoLogoutToggle.checked,
        tiempo: sessionTimer.value,
      };
      localStorage.setItem("configSeguridad", JSON.stringify(nuevaConfig));
      alert("Configuración de seguridad guardada con éxito.");
    });
  }
});
