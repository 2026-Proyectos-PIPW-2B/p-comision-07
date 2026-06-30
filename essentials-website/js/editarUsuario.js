let usuarioEditandoId = null;

document.addEventListener("DOMContentLoaded", () => {
  const tablaUsuarios = document.getElementById("users-tbody");

  if (tablaUsuarios) {
    tablaUsuarios.addEventListener("click", (evento) => {
      const botonEditar = evento.target.closest(".btn-editar-usuario");

      if (botonEditar) {
        const idString = botonEditar.getAttribute("data-id");
        usuarioEditandoId = parseInt(idString);

        abrirModalEditarUsuario(usuarioEditandoId);
      }
    });
  }

  const formEditarUsuario = document.getElementById("form-editar-usuario");
  if (formEditarUsuario) {
    formEditarUsuario.addEventListener("submit", guardarCambiosUsuario);
  }
});

function abrirModalEditarUsuario(idUsuario) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuario = usuarios.find((u) => u.id === idUsuario);

  if (usuario) {
    document.getElementById("edit-user-id").value = usuario.id;
    document.getElementById("edit-user-nombre").value = usuario.nombre;
    document.getElementById("edit-user-email").value = usuario.email;

    const selectorRol = document.getElementById("edit-user-rol");
    selectorRol.value = usuario.rol;

    // Verificamos si el que estamos editando es el mismo admin logueado
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado && usuarioLogueado.id === usuario.id) {
      // Bloqueamos el rol para que no se quite el admin a sí mismo por error
      selectorRol.disabled = true;
    } else {
      selectorRol.disabled = false;
    }

    const modalEl = document.getElementById("editUserModal");
    const modalBootstrap = new bootstrap.Modal(modalEl);
    modalBootstrap.show();
  }
}

function guardarCambiosUsuario(evento) {
  evento.preventDefault();

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let index = usuarios.findIndex((u) => u.id === usuarioEditandoId);

  if (index !== -1) {
    let nuevoNombre = document.getElementById("edit-user-nombre").value;
    let selectorRol = document.getElementById("edit-user-rol");

    // Guardamos el nuevo nombre
    usuarios[index].nombre = nuevoNombre;

    // Solo actualizamos el rol si el select no estaba deshabilitado
    if (!selectorRol.disabled) {
      usuarios[index].rol = selectorRol.value;
    }

    // Guardamos en la base de datos local
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Si nos editamos a nosotros mismos, hay que actualizar la sesión activa
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado && usuarioLogueado.id === usuarioEditandoId) {
      usuarioLogueado.nombre = nuevoNombre;
      // El rol se mantiene porque no se puede cambiar a sí mismo, pero lo aseguramos
      usuarioLogueado.rol = usuarios[index].rol;
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
    }

    // Escondemos el modal
    const modalEl = document.getElementById("editUserModal");
    const modalBootstrap = bootstrap.Modal.getInstance(modalEl);
    if (modalBootstrap) {
      modalBootstrap.hide();
    }

    // Actualizamos la tabla
    window.renderizarTablaUsuarios();
  }
}
