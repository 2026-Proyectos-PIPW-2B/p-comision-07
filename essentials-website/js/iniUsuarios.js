const usuariosIniciales = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@essentials.com",
    password: "administrador",
    rol: "admin",
    bloqueado: false,
  },
  {
    id: 2,
    nombre: "Usuario",
    email: "usuario@essentials.com",
    password: "usuario",
    rol: "usuario",
    bloqueado: false,
  },
];

if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}
