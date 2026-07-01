document.addEventListener("DOMContentLoaded", () => {
  const toggleLogout = document.getElementById("auto-logout-toggle");
  const inputAdmin = document.getElementById("session-admin-segundos");
  const inputUser = document.getElementById("session-user-segundos");
  const btnGuardar = document.getElementById("btn-guardar-seguridad");
  const timerOptions = document.getElementById("timer-options");

  if (toggleLogout && inputAdmin && inputUser && btnGuardar) {
    const configGuardada = JSON.parse(localStorage.getItem("configSeguridad")) || {
      activo: true,
      tiempoAdmin: 300,
      tiempoUsuario: 1800
    };

    toggleLogout.checked = configGuardada.activo;
    inputAdmin.value = configGuardada.tiempoAdmin;
    inputUser.value = configGuardada.tiempoUsuario;
    
    if (!configGuardada.activo) {
      timerOptions.classList.add("opacity-50");
      inputAdmin.disabled = true;
      inputUser.disabled = true;
    }

    toggleLogout.addEventListener("change", () => {
      const activo = toggleLogout.checked;
      if (activo) {
        timerOptions.classList.remove("opacity-50");
        inputAdmin.disabled = false;
        inputUser.disabled = false;
      } else {
        timerOptions.classList.add("opacity-50");
        inputAdmin.disabled = true;
        inputUser.disabled = true;
      }
    });

    btnGuardar.addEventListener("click", () => {
      let tAdmin = parseInt(inputAdmin.value);
      let tUser = parseInt(inputUser.value);

      if (isNaN(tAdmin) || tAdmin < 10) tAdmin = 300;
      if (isNaN(tUser) || tUser < 10) tUser = 1800;

      const nuevaConfig = {
        activo: toggleLogout.checked,
        tiempoAdmin: tAdmin,
        tiempoUsuario: tUser
      };

      localStorage.setItem("configSeguridad", JSON.stringify(nuevaConfig));

      alert("Configuración de seguridad guardada con éxito.");
    });
  }
});
