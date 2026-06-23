const usuariosIniciales = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@essentials.com",
    password: "123456",
    rol: "admin",
    bloqueado: false,
  },
];

if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}
