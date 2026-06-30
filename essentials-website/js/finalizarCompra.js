const Checkout = {

  CLAVE_PEDIDOS: "pedidos",

  mostrarFormulario: function () {
    const carrito = CarritoStorage.obtener();


    if (carrito.length === 0) {
        document.getElementById("btn-finalizar-compra").disabled = true;
        return;
    } else {
        document.getElementById("btn-finalizar-compra").disabled = false;
    }

    

    document.getElementById("checkout-container").classList.remove("d-none");
    document.getElementById("btn-finalizar-compra").disabled = true;
    document.getElementById("checkout-container");
  },

  mostrarError: function (idFeedback, mensaje) {
    const feedback = document.getElementById(idFeedback);
    feedback.textContent = mensaje;
    feedback.classList.remove("d-none");
  },

  ocultarError: function (idFeedback) {
    document.getElementById(idFeedback).classList.add("d-none");
  },

  validarContacto: function () {
    const nombre = document.getElementById("chk-nombre").value.trim();
    const email = document.getElementById("chk-email").value.trim();
    const telefono = document.getElementById("chk-telefono").value.trim();

    Checkout.ocultarError("feedback-contacto");

    if (!nombre || !telefono) {
      Checkout.mostrarError("feedback-contacto", "Completá todos los campos.");
      return false;
    }

    if (!Validacion.validarEmail(email)) {
      Checkout.mostrarError("feedback-contacto", "El correo electrónico no es válido.");
      return false;
    }

    return true;
  },

  validarEnvio: function () {
    const direccion = document.getElementById("chk-direccion").value.trim();
    const ciudad = document.getElementById("chk-ciudad").value.trim();
    const cp = document.getElementById("chk-cp").value.trim();

    Checkout.ocultarError("feedback-envio");

    if (!direccion || !ciudad || !cp) {
      Checkout.mostrarError("feedback-envio", "Completá todos los campos.");
      return false;
    }

    return true;
  },

  validarPago: function () {
    const metodo = document.getElementById("chk-metodo-pago").value;

    Checkout.ocultarError("feedback-pago");

    if (!metodo) {
      Checkout.mostrarError("feedback-pago", "Seleccioná un método de pago.");
      return false;
    }

    const esTarjeta = metodo === "tarjeta_credito" || metodo === "tarjeta_debito";

    if (esTarjeta) {
      const numero = document.getElementById("chk-numero-tarjeta").value.trim();
      const vencimiento = document.getElementById("chk-vencimiento").value.trim();
      const cvv = document.getElementById("chk-cvv").value.trim();

      if (!numero || !vencimiento || !cvv) {
        Checkout.mostrarError("feedback-pago", "Completá todos los datos de la tarjeta.");
        return false;
      }
    }

    return true;
  },

  avanzarAcordeon: function (idSiguiente) {
    const siguienteCollapse = document.getElementById(idSiguiente);
    const instancia = bootstrap.Collapse.getOrCreateInstance(siguienteCollapse);
    instancia.show();
  },

  obtenerProductosCarrito: function () {
    const carrito = CarritoStorage.obtener();
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    const items = [];
    for (const item of carrito) {
      const producto = productos.find((p) => p.id === item.id);
      if (producto) {
        items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: item.cantidad,
        });
      }
    }

    return items;
  },

  calcularTotales: function (items) {
    let subtotal = 0;

    for (const item of items) {
      subtotal += item.precio * item.cantidad;
    }

    const envio = subtotal > 0 ? Carrito.COSTO_ENVIO : 0;

    return { subtotal: subtotal, envio: envio, total: subtotal + envio };
  },

  guardarPedido: function (pedido) {
    const pedidos = JSON.parse(localStorage.getItem(Checkout.CLAVE_PEDIDOS)) || [];
    pedidos.push(pedido);
    localStorage.setItem(Checkout.CLAVE_PEDIDOS, JSON.stringify(pedidos));
  },

  confirmarCompra: function () {
    if (!Checkout.validarPago()) return;

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const items = Checkout.obtenerProductosCarrito();
    const totales = Checkout.calcularTotales(items);

    const pedido = {
      numeroPedido: Date.now(),
      fecha: new Date().toISOString(),
      usuarioId: usuarioLogueado,
      contacto: {
        nombre: document.getElementById("chk-nombre").value.trim(),
        email: document.getElementById("chk-email").value.trim(),
        telefono: document.getElementById("chk-telefono").value.trim(),
      },
      envio: {
        direccion: document.getElementById("chk-direccion").value.trim(),
        ciudad: document.getElementById("chk-ciudad").value.trim(),
        codigoPostal: document.getElementById("chk-cp").value.trim(),
      },
      pago: {
        metodo: document.getElementById("chk-metodo-pago").value,
      },
      productos: items,
      subtotal: totales.subtotal,
      total: totales.total,
    };

    Checkout.guardarPedido(pedido);

    CarritoStorage.guardar([]);

    Checkout.mostrarExito(pedido);
  },

  mostrarExito: function (pedido) {
    document.getElementById("checkout-container").classList.add("d-none");

    document.getElementById("contenedor-carrito").innerHTML = "";
    Carrito.mostrarMensajeSiVacio();
    Carrito.actualizarResumen();

    document.getElementById("exito-numero-pedido").textContent = pedido.numeroPedido;
    document.getElementById("exito-email").textContent = pedido.contacto.email;

    const exitoContainer = document.getElementById("exito-container");
    exitoContainer.classList.remove("d-none");
    exitoContainer.scrollIntoView({ behavior: "smooth" });
  },

};

document.addEventListener("DOMContentLoaded", () => {
  const btnFinalizar = document.getElementById("btn-finalizar-compra");
  const btnContinuarContacto = document.getElementById("btn-continuar-contacto");
  const btnContinuarEnvio = document.getElementById("btn-continuar-envio");
  const btnConfirmarCompra = document.getElementById("btn-confirmar-compra");
  const selectMetodoPago = document.getElementById("chk-metodo-pago");

  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", Checkout.mostrarFormulario);
  }

  if (btnContinuarContacto) {
    btnContinuarContacto.addEventListener("click", () => {
      if (Checkout.validarContacto()) {
        Checkout.avanzarAcordeon("collapse-envio");
      }
    });
  }

  if (btnContinuarEnvio) {
    btnContinuarEnvio.addEventListener("click", () => {
      if (Checkout.validarEnvio()) {
        Checkout.avanzarAcordeon("collapse-pago");
      }
    });
  }

  if (selectMetodoPago) {
    selectMetodoPago.addEventListener("change", () => {
      const camposTarjeta = document.getElementById("campos-tarjeta");
      const esTarjeta =
        selectMetodoPago.value === "tarjeta_credito" || selectMetodoPago.value === "tarjeta_debito";
      camposTarjeta.classList.toggle("d-none", !esTarjeta);
    });
  }

  if (btnConfirmarCompra) {
    btnConfirmarCompra.addEventListener("click", Checkout.confirmarCompra);
  }
});