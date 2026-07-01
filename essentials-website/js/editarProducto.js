// Variable global para saber qué producto estamos editando
let productoEditandoId = null;

// Escuchamos los clics en la tabla de productos para detectar cuando tocan el lápiz
document.addEventListener("DOMContentLoaded", () => {
  const tablaProductos = document.getElementById("products-tbody");
  
  if (tablaProductos) {
    tablaProductos.addEventListener("click", (evento) => {
      // Si el elemento clickeado tiene la clase btn-editar
      const botonEditar = evento.target.closest(".btn-editar");
      
      if (botonEditar) {
        // Sacamos el ID del botón
        const idString = botonEditar.getAttribute("data-id");
        productoEditandoId = parseInt(idString);
        
        abrirModalEditarProducto(productoEditandoId);
      }
    });
  }

  // Escuchar cuando se envía el formulario de edición
  const formEditar = document.getElementById("form-editar-producto");
  if (formEditar) {
    formEditar.addEventListener("submit", guardarCambiosProducto);
  }
});

function abrirModalEditarProducto(idProducto) {
  // Traemos los productos guardados
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  // Buscamos el producto que queremos editar
  let productoEncontrado = productos.find(p => p.id === idProducto);
  
  if (productoEncontrado) {
    // Llenamos los inputs del modal con los datos actuales
    document.getElementById("edit-prod-id").value = productoEncontrado.id;
    document.getElementById("edit-prod-nombre").value = productoEncontrado.nombre;
    document.getElementById("edit-prod-categoria").value = productoEncontrado.categoria;
    document.getElementById("edit-prod-precio").value = productoEncontrado.precio;
    
    // Para la imagen, le sacamos la ruta y la extensión (.webp)
    let nombreImagen = productoEncontrado.imagen.replace("img/", "").replace(".webp", "");
    document.getElementById("edit-prod-imagen").value = nombreImagen;

    const inputStock = document.getElementById("edit-prod-stock");
    if (productoEncontrado.cantidadStock !== undefined) {
      inputStock.value = productoEncontrado.cantidadStock;
    } else {
      inputStock.value = 0;
    }

    // Mostramos el modal de Bootstrap
    const modalEl = document.getElementById("editProductModal");
    const modalBootstrap = new bootstrap.Modal(modalEl);
    modalBootstrap.show();
  }
}

function guardarCambiosProducto(evento) {
  // Evitamos que la página se recargue
  evento.preventDefault();
  
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
  // Encontramos la posición del producto en la lista
  let index = productos.findIndex(p => p.id === productoEditandoId);
  
  if (index !== -1) {
    // Obtenemos los nuevos valores del formulario
    let nuevoNombre = document.getElementById("edit-prod-nombre").value;
    let nuevaCategoria = document.getElementById("edit-prod-categoria").value;
    let nuevoPrecio = parseFloat(document.getElementById("edit-prod-precio").value);
    let nombreImagen = document.getElementById("edit-prod-imagen").value;
    
    let stockElegido = parseInt(document.getElementById("edit-prod-stock").value) || 0;

    // Actualizamos el producto con los nuevos datos
    productos[index].nombre = nuevoNombre;
    productos[index].categoria = nuevaCategoria;
    productos[index].precio = nuevoPrecio;
    productos[index].cantidadStock = stockElegido;
    delete productos[index].estadoStock;
    delete productos[index].claseStock;
    productos[index].imagen = "img/" + nombreImagen + ".webp";
    
    // Guardamos en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
    
    // También actualizamos el carrito si el producto estaba ahí
    actualizarProductoEnCarrito(productoEditandoId, nuevoNombre, nuevoPrecio, productos[index].imagen);

    // Escondemos el modal
    const modalEl = document.getElementById("editProductModal");
    const modalBootstrap = bootstrap.Modal.getInstance(modalEl);
    if (modalBootstrap) {
      modalBootstrap.hide();
    }
    
    // Refrescamos la tabla
    renderizarTablaProductos();
    

  }
}

function actualizarProductoEnCarrito(id, nuevoNombre, nuevoPrecio, nuevaImagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let huboCambios = false;
  
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].nombre = nuevoNombre;
      carrito[i].precio = nuevoPrecio;
      carrito[i].imagen = nuevaImagen;
      huboCambios = true;
    }
  }
  
  if (huboCambios) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}
