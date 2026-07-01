document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("tabla-pedidos-body");
    if (!tbody) return;

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    let pedidosBase = [];
    if (usuarioLogueado && usuarioLogueado.rol === "admin") {
        pedidosBase = [...pedidosGuardados];
    } else if (usuarioLogueado) {
        pedidosBase = pedidosGuardados.filter(pedido => pedido.usuarioId.id === usuarioLogueado.id);
    }

    if (usuarioLogueado && usuarioLogueado.rol === "admin") {
        const theadTr = document.querySelector("thead tr");
        if (theadTr && theadTr.children.length === 3) {
            const th = document.createElement("th");
            th.scope = "col";
            th.textContent = "Usuario ID";
            theadTr.insertBefore(th, theadTr.firstChild);
        }
    }

    function renderizarTabla(pedidosARenderizar) {
        tbody.innerHTML = "";
        
        if (pedidosARenderizar.length === 0) {
            let colspan = 3;
            if (usuarioLogueado && usuarioLogueado.rol === "admin") {
                colspan = 4;
            }
            tbody.innerHTML = `<tr><td colspan="${colspan}" class="text-center py-4 text-muted">No se encontraron compras con los filtros actuales.</td></tr>`;
            return;
        }

        for (const pedido of pedidosARenderizar) {
            const fechaParseada = pedido.fecha.split("T")[0];
            const fechaFormateada = fechaParseada.split("-").reverse().join("/");

            let nombresProductos = "";
            for (const producto of pedido.productos) {
                nombresProductos += `${producto.nombre} x${producto.cantidad}<br>`;
            }
            
            const fila = document.createElement("tr");
            
            if (usuarioLogueado && usuarioLogueado.rol === "admin") {
                fila.innerHTML = `
                    <td>${pedido.usuarioId.id}</td>
                    <td>${fechaFormateada}</td>
                    <td>${nombresProductos}</td>
                    <td>$${pedido.total.toLocaleString("es-AR")}</td>
                `;
            } else {
                fila.innerHTML = `
                    <td>${fechaFormateada}</td>
                    <td>${nombresProductos}</td>
                    <td>$${pedido.total.toLocaleString("es-AR")}</td>
                `;
            }

            tbody.appendChild(fila);
        }
    }

    if (typeof inicializarFiltrosHisCompras === "function") {
        inicializarFiltrosHisCompras(pedidosBase, renderizarTabla, usuarioLogueado);
    }

    renderizarTabla(pedidosBase);
});