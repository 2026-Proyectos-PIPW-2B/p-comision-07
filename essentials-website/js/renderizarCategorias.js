document.addEventListener("DOMContentLoaded", () => {
  cargarSelectCategorias();
  cargarFiltrosCategoriasAdmin();
  cargarFiltrosCategoriasCliente();
});

function cargarSelectCategorias() {
  const selectAlta = document.getElementById("prod-categoria");
  const selectEdit = document.getElementById("edit-prod-categoria");
  
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  
  const generarOpciones = () => {
    let html = `<option value="">Seleccioná</option>`;
    categorias.forEach(cat => {
      html += `<option value="${cat.nombre}">${cat.nombre}</option>`;
    });
    return html;
  };

  if (selectAlta) {
    selectAlta.innerHTML = generarOpciones();
  }
  if (selectEdit) {
    const valorPrevio = selectEdit.value;
    selectEdit.innerHTML = generarOpciones();
    if (valorPrevio && categorias.some(c => c.nombre === valorPrevio)) {
      selectEdit.value = valorPrevio;
    }
  }
}

function cargarFiltrosCategoriasAdmin() {
  const listaCategoriasAdmin = document.getElementById("lista-categorias");
  if (!listaCategoriasAdmin) return;

  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  
  let html = `
    <li>
      <button type="button" class="btn btn-dark btn-sm rounded-pill px-3 fw-semibold btn-categoria" data-categoria="Todos">
        Todos
      </button>
    </li>
  `;
  
  categorias.forEach(cat => {
    html += `
      <li>
        <button type="button" class="btn btn-outline-dark btn-sm rounded-pill px-3 btn-categoria" data-categoria="${cat.nombre}">
          ${cat.nombre}
        </button>
      </li>
    `;
  });
  
  listaCategoriasAdmin.innerHTML = html;

  if (typeof iniciarFiltrosAdmin === "function") {
    document.dispatchEvent(new Event('categoriasFiltrosAdminRenderizadas'));
  }
}

function cargarFiltrosCategoriasCliente() {
  const contenedorCategoriasCliente = document.getElementById("contenedor-categorias");
  if (!contenedorCategoriasCliente) return;

  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  
  let html = "";
  
  categorias.forEach(cat => {
    html += `
          <div class="col">
            <a
              href="productos.html"
              class="d-block position-relative ratio ratio-1x1 text-decoration-none shadow-sm rounded-4 overflow-hidden"
            >
              <img
                src="img/${cat.imagen}"
                class="w-100 h-100 object-fit-cover"
                alt="${cat.nombre}"
              />
              <div
                class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
              ></div>
              <div
                class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              >
                <h4 class="text-white text-uppercase m-0 fw-bold">${cat.nombre}</h4>
              </div>
            </a>
          </div>
    `;
  });
  
  contenedorCategoriasCliente.innerHTML = html;
}
