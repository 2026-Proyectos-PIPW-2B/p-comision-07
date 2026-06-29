document.addEventListener("DOMContentLoaded", () => {
  CarritoStorage.actualizarContador();
  const cuentaContainer = document.getElementById("cuenta-navbar");
  if (!cuentaContainer) return;

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    cuentaContainer.innerHTML = `
      <a class="text-white fs-4" href="login.html" id="link-login">
        <i class="bi bi-person-circle"></i>
      </a>
    `;
    return;
  }

  let html = "";

  if (usuarioLogueado.rol === "admin") {
    html += `
      <a class="text-white fs-4 me-3 text-decoration-none" href="panel-admin.html">
        <i class="bi bi-gear"></i>
      </a>
    `;
  }

  html += `
    <button class="btn btn-sm btn-outline-light rounded-pill" id="btnLogout">
      Cerrar sesión
    </button>
  `;

  cuentaContainer.innerHTML = html;

  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });
});
