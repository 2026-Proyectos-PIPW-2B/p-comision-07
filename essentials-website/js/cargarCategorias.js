const categoriasIniciales = [
  { nombre: "Pantalones", imagen: "cat-pantalones.webp" },
  { nombre: "Camperas", imagen: "cat-camperas.webp" },
  { nombre: "Buzos", imagen: "cat-buzos.webp" },
  { nombre: "Remeras", imagen: "cat-remeras.webp" },
  { nombre: "Combos", imagen: "cat-combos.webp" },
  { nombre: "Accesorios", imagen: "cat-accesorios.jpg" }
];

function inicializarCategorias() {
  const categoriasStorage = localStorage.getItem("categorias");
  if (!categoriasStorage) {
    localStorage.setItem("categorias", JSON.stringify(categoriasIniciales));
  }
}

inicializarCategorias();
