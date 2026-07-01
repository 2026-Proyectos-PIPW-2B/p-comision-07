const CarritoStorage = {

  CLAVE: "carrito",

  obtener: function () {
    return JSON.parse(localStorage.getItem(CarritoStorage.CLAVE)) || [];
  },

  guardar: function (carrito) {
    localStorage.setItem(CarritoStorage.CLAVE, JSON.stringify(carrito));
  },

  agregarProducto: function (idProducto) {
    const carrito = CarritoStorage.obtener();
    const productosDB = JSON.parse(localStorage.getItem("productos")) || [];
    const prodDB = productosDB.find((p) => p.id === idProducto);
    
    if (!prodDB || prodDB.cantidadStock === 0) {
      alert("No hay stock disponible de este producto.");
      return;
    }

    const itemExistente = carrito.find((item) => item.id === idProducto);
    let cantidadSolicitada = 1;
    if (itemExistente) {
      cantidadSolicitada = itemExistente.cantidad + 1;
    }

    if (cantidadSolicitada > prodDB.cantidadStock) {
      alert(`Solo tenemos ${prodDB.cantidadStock} unidades disponibles en stock.`);
      return;
    }

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      carrito.push({ id: idProducto, cantidad: 1 });
    }

    CarritoStorage.guardar(carrito);
  },

  actualizarCantidad: function (idProducto, cantidad) {
    const carrito = CarritoStorage.obtener();
    const productosDB = JSON.parse(localStorage.getItem("productos")) || [];
    const prodDB = productosDB.find((p) => p.id === idProducto);
    
    if (prodDB && cantidad > prodDB.cantidadStock) {
      alert(`Solo tenemos ${prodDB.cantidadStock} unidades disponibles en stock.`);
      cantidad = prodDB.cantidadStock;
    }

    const item = carrito.find((item) => item.id === idProducto);

    if (item) {
      item.cantidad = cantidad;
      CarritoStorage.guardar(carrito);
    }
  },

  eliminarProducto: function (idProducto) {
    const carrito = CarritoStorage.obtener();
    const carritoActualizado = carrito.filter((item) => item.id !== idProducto);
    CarritoStorage.guardar(carritoActualizado);
  },

  contarUnidades: function () {
    const carrito = CarritoStorage.obtener();
    let total = 0;

    for (const item of carrito) {
      total += item.cantidad;
    }

    return total;
  },

  actualizarContador: function () {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    contador.textContent = CarritoStorage.contarUnidades();
  },

};
