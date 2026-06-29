document.getElementById("btnLogin").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const feedbackEl = document.getElementById("feedback");


const yaLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (yaLogueado) {
  if (yaLogueado.rol === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "inicio.html";
  }
}

  const errores = Validacion.validarLogin(email, password);
  if (errores.length > 0) {
    feedbackEl.innerHTML = "";
    for (const e of errores) {
      feedbackEl.innerHTML += e + "<br>";
    }
    feedbackEl.classList.remove("d-none");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const encontrado = usuarios.find(u => u.email === email && u.password === password);

  if (!encontrado) {
    feedbackEl.innerHTML = "El correo o la contraseña son incorrectos.";
    feedbackEl.classList.remove("d-none");
    return;
  }

  if (encontrado.bloqueado) {
    feedbackEl.innerHTML = "Tu cuenta se encuentra bloqueada. Contactá al administrador.";
    feedbackEl.classList.remove("d-none");
    return;
  }

  localStorage.setItem("usuarioLogueado", JSON.stringify(encontrado));

  feedbackEl.classList.add("d-none");
  if (encontrado.rol === "admin") {
    window.location.href = "panel-admin.html";
  } else {
    window.location.href = "inicio.html";
  }
});

