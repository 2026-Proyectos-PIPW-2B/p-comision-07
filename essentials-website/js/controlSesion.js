(function() {
  function checkSession() {
    const usuarioString = localStorage.getItem("usuarioLogueado");
    if (!usuarioString) return;

    const usuario = JSON.parse(usuarioString);
    if (!usuario.horaInicioSesion) return;

    const configGuardada = JSON.parse(localStorage.getItem("configSeguridad")) || {
      activo: true,
      tiempoAdmin: 300,
      tiempoUsuario: 1800
    };

    if (!configGuardada.activo) return;

    let limiteSegundos = 0;
    if (usuario.rol === "admin") {
      limiteSegundos = configGuardada.tiempoAdmin;
    } else {
      limiteSegundos = configGuardada.tiempoUsuario;
    }
    
    const segundosTranscurridos = (Date.now() - usuario.horaInicioSesion) / 1000;

    if (segundosTranscurridos > limiteSegundos) {
      localStorage.removeItem("usuarioLogueado");
      alert("Su sesión ha excedido el tiempo máximo establecido por seguridad, por favor inicie sesión nuevamente para continuar disfrutando de Essentials");
      window.location.href = "login.html";
    }
  }

  setInterval(checkSession, 5000);
  
  checkSession();
})();
