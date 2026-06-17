const usuariosIniciales = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@essentials.com",
    password: "123456",
    rol: "admin",
    bloqueado: false
  },
  {
    id: 2,
    nombre: "Juan",
    email: "usuario@essentials.com",
    password: "123456",
    rol: "usuario",
    bloqueado: false
  }
];

localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));

