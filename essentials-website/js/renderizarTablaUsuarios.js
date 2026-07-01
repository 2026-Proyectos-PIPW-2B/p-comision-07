// Exponer estado y función global
window.currentSort = "az"; // 'az' o 'za'
window.searchQuery = "";

window.renderizarTablaUsuarios = function() {
  const usersTbody = document.getElementById("users-tbody");
  const usersTable = document.getElementById("users-table");
  const usersEmpty = document.getElementById("users-empty");

  if (!usersTbody) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) return;

  // Filtrar
  let usuariosFiltrados = usuarios.filter(u => {
    const query = window.searchQuery.toLowerCase();
    return (
      u.nombre.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    );
  });

  // Ordenar
  usuariosFiltrados.sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (window.currentSort === "az") {
      return nombreA.localeCompare(nombreB);
    } else {
      return nombreB.localeCompare(nombreA);
    }
  });

  // Limpiar tbody
  usersTbody.innerHTML = "";

  // Manejar estado vacío
  if (usuariosFiltrados.length === 0) {
    if (usersTable) usersTable.classList.add("d-none");
    if (usersEmpty) usersEmpty.classList.remove("d-none");
    return;
  } else {
    if (usersTable) usersTable.classList.remove("d-none");
    if (usersEmpty) usersEmpty.classList.add("d-none");
  }

  // Dibujar filas
  usuariosFiltrados.forEach(user => {
    const tr = document.createElement("tr");

    // Rol badge
    const esAdmin = user.rol === "admin";
    let rolBadge;
    if (esAdmin) {
      rolBadge = `<span class="badge bg-dark text-white border">Administrador</span>`;
    } else {
      rolBadge = `<span class="badge bg-light text-dark border">Usuario</span>`;
    }

    // Prevenir auto-bloqueo y auto-eliminación
    const esMismoUsuario = user.id === usuarioLogueado.id;
    let switchDisabledAttr;
    if (esMismoUsuario) {
      switchDisabledAttr = "disabled";
    } else {
      switchDisabledAttr = "";
    }

    let deleteDisabledAttr;
    if (esMismoUsuario) {
      deleteDisabledAttr = "disabled";
    } else {
      deleteDisabledAttr = "";
    }

    let checkedAttr;
    if (user.bloqueado) {
      checkedAttr = 'checked';
    } else {
      checkedAttr = '';
    }

    let titleEliminar;
    if (esMismoUsuario) {
      titleEliminar = 'No podés eliminarte a vos mismo';
    } else {
      titleEliminar = 'Eliminar';
    }

    tr.innerHTML = `
      <td class="fw-bold text-center">${user.id}</td>
      <td class="text-center"><span class="fw-medium">${user.nombre}</span></td>
      <td class="text-center">${user.email}</td>
      <td class="text-center">${rolBadge}</td>
      <td class="text-center">
        <div class="form-check form-switch d-flex justify-content-center">
          <input class="form-check-input switch-bloqueo" type="checkbox" role="switch" data-id="${user.id}" ${checkedAttr} ${switchDisabledAttr}>
        </div>
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-primary btn-editar-usuario" data-id="${user.id}" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger btn-eliminar-usuario" data-id="${user.id}" ${deleteDisabledAttr} title="${titleEliminar}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    usersTbody.appendChild(tr);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const userSearchInput = document.getElementById("user-search");
  const btnSortAz = document.getElementById("sort-az");
  const btnSortZa = document.getElementById("sort-za");

  // Buscador de usuarios
  if (userSearchInput) {
    userSearchInput.addEventListener("input", (e) => {
      window.searchQuery = e.target.value;
      window.renderizarTablaUsuarios();
    });
  }

  // Botón Orden A - Z
  if (btnSortAz) {
    btnSortAz.addEventListener("click", () => {
      window.currentSort = "az";
      btnSortAz.classList.replace("btn-outline-dark", "btn-dark");
      btnSortAz.classList.add("fw-semibold");
      if (btnSortZa) {
        btnSortZa.classList.replace("btn-dark", "btn-outline-dark");
        btnSortZa.classList.remove("fw-semibold");
      }
      window.renderizarTablaUsuarios();
    });
  }

  // Botón Orden Z - A
  if (btnSortZa) {
    btnSortZa.addEventListener("click", () => {
      window.currentSort = "za";
      btnSortZa.classList.replace("btn-outline-dark", "btn-dark");
      btnSortZa.classList.add("fw-semibold");
      if (btnSortAz) {
        btnSortAz.classList.replace("btn-dark", "btn-outline-dark");
        btnSortAz.classList.remove("fw-semibold");
      }
      window.renderizarTablaUsuarios();
    });
  }

  // Cargar tabla inicial
  window.renderizarTablaUsuarios();
});
