document.addEventListener("DOMContentLoaded", () => {
  const formNuevoUsuario = document.getElementById("form-nuevo-usuario");

  if (formNuevoUsuario) {
    formNuevoUsuario.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("new-name").value.trim();
      const email = document.getElementById("new-email").value.trim();
      const password = document.getElementById("new-pass").value.trim();
      const rol = document.getElementById("nuevo-rol").value;

      // Validar campos usando Validacion (de validacion.js)
      if (typeof Validacion !== "undefined") {
        const errores = Validacion.validarLogin(email, password);
        if (errores.length > 0) {
          alert(errores.join("\n"));
          return;
        }
      } else {
        if (password.length < 6) {
          alert("La contraseña debe tener al menos 6 caracteres.");
          return;
        }
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Validar si el email ya existe
      const emailExiste = usuarios.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (emailExiste) {
        alert("El correo electrónico ya se encuentra registrado.");
        return;
      }

      // Crear nuevo usuario
      const nuevoId = Date.now();
      const nuevoUsuario = {
        id: nuevoId,
        nombre: name,
        email: email,
        password: password,
        rol: rol,
        bloqueado: false,
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario creado exitosamente.");

      // Limpiar formulario
      formNuevoUsuario.reset();

      // Recargar datos en otros módulos si las funciones globales existen
      if (typeof window.actualizarEstadisticas === "function") {
        window.actualizarEstadisticas();
      }
      if (typeof window.renderizarTablaUsuarios === "function") {
        window.renderizarTablaUsuarios();
      }
    });
  }
});
