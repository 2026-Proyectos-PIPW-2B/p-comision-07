let categoriaActual = "Todos";
let terminoBusqueda = "";
let criterioOrden = "nombre";
let direccionOrden = "asc";

function aplicarFiltrosYOrden() {
  const productosBase = JSON.parse(localStorage.getItem("productos")) || [];

  let productosFiltrados = productosBase.filter((p) => {
    const coincideCategoria =
      categoriaActual === "Todos" || p.categoria === categoriaActual;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  productosFiltrados.sort((a, b) => {
    let valorA = a[criterioOrden];
    let valorB = b[criterioOrden];

    if (criterioOrden === "nombre") {
      valorA = valorA.toLowerCase();
      valorB = valorB.toLowerCase();
    }

    if (direccionOrden === "asc") {
      if (valorA > valorB) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (valorA < valorB) {
        return 1;
      } else {
        return -1;
      }
    }
  });

  if (document.getElementById("contenedor-productos")) {
    renderizarProductos(productosFiltrados);
  } else if (document.getElementById("products-tbody")) {
    renderizarTablaProductos(productosFiltrados);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador-productos");
  const selectorOrden = document.getElementById("ordenar-selector");
  const btnAsc = document.getElementById("orden-asc");
  const btnDesc = document.getElementById("orden-desc");
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    categoriaActual = catParam;
    aplicarFiltrosYOrden();
  }

  iniciarFiltrosAdmin();

  buscador.addEventListener("input", (e) => {
    terminoBusqueda = e.target.value;
    aplicarFiltrosYOrden();
  });

  selectorOrden.addEventListener("change", (e) => {
    criterioOrden = e.target.value;
    aplicarFiltrosYOrden();
  });

  btnAsc.addEventListener("click", () => {
    direccionOrden = "asc";
    btnAsc.classList.replace("btn-outline-dark", "btn-dark");
    btnDesc.classList.replace("btn-dark", "btn-outline-dark");
    aplicarFiltrosYOrden();
  });

  btnDesc.addEventListener("click", () => {
    direccionOrden = "desc";
    btnDesc.classList.replace("btn-outline-dark", "btn-dark");
    btnAsc.classList.replace("btn-dark", "btn-outline-dark");
    aplicarFiltrosYOrden();
  });
});

function iniciarFiltrosAdmin() {
  const botonesCategoria = document.querySelectorAll(".btn-categoria");
  if (!botonesCategoria.length) return;

  botonesCategoria.forEach((btn) => {
    if (btn.getAttribute("data-categoria") === categoriaActual) {
      botonesCategoria.forEach((b) => {
        b.classList.remove("btn-dark", "fw-semibold");
        b.classList.add("btn-outline-dark");
      });
      btn.classList.remove("btn-outline-dark");
      btn.classList.add("btn-dark", "fw-semibold");
    }

    btn.addEventListener("click", () => {
      botonesCategoria.forEach((b) => {
        b.classList.remove("btn-dark", "fw-semibold");
        b.classList.add("btn-outline-dark");
      });
      btn.classList.remove("btn-outline-dark");
      btn.classList.add("btn-dark", "fw-semibold");

      categoriaActual = btn.getAttribute("data-categoria");
      aplicarFiltrosYOrden();
    });
  });
}

document.addEventListener("categoriasFiltrosAdminRenderizadas", () => {
  iniciarFiltrosAdmin();
});
