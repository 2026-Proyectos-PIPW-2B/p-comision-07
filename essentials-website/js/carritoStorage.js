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
    const itemExistente = carrito.find((item) => item.id === idProducto);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      carrito.push({ id: idProducto, cantidad: 1 });
    }

    CarritoStorage.guardar(carrito);
  },

  actualizarCantidad: function (idProducto, cantidad) {
    const carrito = CarritoStorage.obtener();
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
