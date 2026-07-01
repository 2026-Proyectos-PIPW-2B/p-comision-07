function inicializarFiltrosHisCompras(pedidosBase, renderizarTabla, usuarioLogueado) {
    const inputFechaDesde = document.getElementById("filtro-fecha-desde");
    const inputFechaHasta = document.getElementById("filtro-fecha-hasta");
    const inputMontoMin = document.getElementById("filtro-monto-min");
    const inputMontoMax = document.getElementById("filtro-monto-max");
    const btnLimpiar = document.getElementById("btn-limpiar-filtros");
    const inputUsuario = document.getElementById("filtro-usuario");

    if (inputUsuario && usuarioLogueado && usuarioLogueado.rol === "admin") {
        // Obtenemos solo los IDs de todos los pedidos
        const idsDeUsuarios = pedidosBase.map(pedido => pedido.usuarioId.id);
        
        // Creamos un Set para eliminar los IDs duplicados
        const idsSinRepetir = new Set(idsDeUsuarios);
        
        // Convertimos el Set de vuelta a un Arreglo normal
        const usuariosConPedidos = Array.from(idsSinRepetir);
        
        // Ordenamos los números de menor a mayor
        usuariosConPedidos.sort((a, b) => a - b);

        for (const userId of usuariosConPedidos) {
            const option = document.createElement("option");
            option.value = userId;
            option.textContent = `ID: ${userId}`;
            inputUsuario.appendChild(option);
        }
    }

    function filtrarPedidos() {
        let hayError = false;
        const hoy = new Date().toISOString().split("T")[0];

        // Limpiamos los errores visuales previos
        if (inputFechaDesde) inputFechaDesde.classList.remove("is-invalid");
        if (inputFechaHasta) inputFechaHasta.classList.remove("is-invalid");
        if (inputMontoMin) inputMontoMin.classList.remove("is-invalid");
        if (inputMontoMax) inputMontoMax.classList.remove("is-invalid");

        const fechaDesde = inputFechaDesde.value;
        const fechaHasta = inputFechaHasta.value;
        
        let montoMin = 0;
        if (inputMontoMin.value) {
            montoMin = parseFloat(inputMontoMin.value);
        }

        let montoMax = Infinity;
        if (inputMontoMax.value) {
            montoMax = parseFloat(inputMontoMax.value);
        }

        // Verificamos las fechas
        let errorFechaDesde = "";
        let errorFechaHasta = "";

        if (fechaDesde && fechaDesde > hoy) {
            errorFechaDesde = "Fecha futura inválida.";
            hayError = true;
        }
        if (fechaHasta && fechaHasta > hoy) {
            errorFechaHasta = "Fecha futura inválida.";
            hayError = true;
        }
        if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
            errorFechaDesde = "No puede ser posterior a 'Hasta'.";
            errorFechaHasta = "No puede ser previa a 'Desde'.";
            hayError = true;
        }

        // Aplicamos los errores de fechas si existen
        if (errorFechaDesde) {
            inputFechaDesde.classList.add("is-invalid");
            if (inputFechaDesde.nextElementSibling) {
                inputFechaDesde.nextElementSibling.textContent = errorFechaDesde;
            }
        }
        if (errorFechaHasta) {
            inputFechaHasta.classList.add("is-invalid");
            if (inputFechaHasta.nextElementSibling) {
                inputFechaHasta.nextElementSibling.textContent = errorFechaHasta;
            }
        }

        // Verificamos los montos
        let errorMontoMin = "";
        let errorMontoMax = "";

        if (inputMontoMin.value && montoMin < 0) {
            errorMontoMin = "No puede ser negativo.";
            hayError = true;
        }
        if (inputMontoMax.value && montoMax < 0) {
            errorMontoMax = "No puede ser negativo.";
            hayError = true;
        }
        if (inputMontoMin.value && inputMontoMax.value && montoMin > montoMax) {
            errorMontoMin = "Debe ser menor al máximo.";
            errorMontoMax = "Debe ser mayor al mínimo.";
            hayError = true;
        }

        // Aplicamos los errores de montos si existen
        if (errorMontoMin) {
            inputMontoMin.classList.add("is-invalid");
            if (inputMontoMin.nextElementSibling) {
                inputMontoMin.nextElementSibling.textContent = errorMontoMin;
            }
        }
        if (errorMontoMax) {
            inputMontoMax.classList.add("is-invalid");
            if (inputMontoMax.nextElementSibling) {
                inputMontoMax.nextElementSibling.textContent = errorMontoMax;
            }
        }

        // Si existe un error de validación, dejamos la tabla vacía
        if (hayError) {
            renderizarTabla([]);
            return;
        }

        const pedidosFiltrados = pedidosBase.filter(pedido => {
            const fechaPedido = pedido.fecha.split("T")[0];
            const totalPedido = parseFloat(pedido.total);

            if (inputUsuario && inputUsuario.value) {
                if (String(pedido.usuarioId.id) !== inputUsuario.value) {
                    return false;
                }
            }

            if (fechaDesde && fechaPedido < fechaDesde) {
                return false;
            }
            
            if (fechaHasta && fechaPedido > fechaHasta) {
                return false;
            }

            if (inputMontoMin.value && totalPedido < montoMin) {
                return false;
            }

            if (inputMontoMax.value && totalPedido > montoMax) {
                return false;
            }

            return true;
        });

        renderizarTabla(pedidosFiltrados);
    }

    if(inputFechaDesde) inputFechaDesde.addEventListener("input", filtrarPedidos);
    if(inputFechaHasta) inputFechaHasta.addEventListener("input", filtrarPedidos);
    if(inputMontoMin) inputMontoMin.addEventListener("input", filtrarPedidos);
    if(inputMontoMax) inputMontoMax.addEventListener("input", filtrarPedidos);
    if(inputUsuario) inputUsuario.addEventListener("change", filtrarPedidos);

    if(btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            if(inputFechaDesde) {
                inputFechaDesde.value = "";
                inputFechaDesde.classList.remove("is-invalid");
            }
            if(inputFechaHasta) {
                inputFechaHasta.value = "";
                inputFechaHasta.classList.remove("is-invalid");
            }
            if(inputMontoMin) {
                inputMontoMin.value = "";
                inputMontoMin.classList.remove("is-invalid");
            }
            if(inputMontoMax) {
                inputMontoMax.value = "";
                inputMontoMax.classList.remove("is-invalid");
            }
            if(inputUsuario) inputUsuario.value = "";
            renderizarTabla(pedidosBase);
        });
    }
}
