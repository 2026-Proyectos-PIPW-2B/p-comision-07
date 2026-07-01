const pedidosIniciales = [
  {
    id: 1,
    usuarioId: { id: 2, nombre: "Usuario", email: "usuario@essentials.com" },
    fecha: "2026-03-15T14:30:00",
    total: 31000,
    productos: [
      { id: 2, nombre: "Remera regular fit", cantidad: 2, precio: 8000 },
      { id: 1, nombre: "Baggie azul", cantidad: 1, precio: 15000 },
    ],
  },
  {
    id: 2,
    usuarioId: { id: 2, nombre: "Usuario", email: "usuario@essentials.com" },
    fecha: "2026-05-10T10:15:00",
    total: 18000,
    productos: [{ id: 4, nombre: "Buzo Hoodie", cantidad: 1, precio: 18000 }],
  },
  {
    id: 3,
    usuarioId: { id: 2, nombre: "Usuario", email: "usuario@essentials.com" },
    fecha: "2026-06-02T18:45:00",
    total: 38000,
    productos: [
      { id: 3, nombre: "Campera Jean Hombre", cantidad: 1, precio: 25000 },
      { id: 2, nombre: "Remera regular fit", cantidad: 1, precio: 8000 },
      { id: 6, nombre: "Bag Negra", cantidad: 1, precio: 5000 },
    ],
  },
];

if (
  !localStorage.getItem("pedidos") ||
  JSON.parse(localStorage.getItem("pedidos")).length === 0
) {
  localStorage.setItem("pedidos", JSON.stringify(pedidosIniciales));
}
