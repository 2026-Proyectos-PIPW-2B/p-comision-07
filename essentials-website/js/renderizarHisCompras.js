document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("tabla-pedidos-body");
    if (!tbody) return;

        const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        const esAdmin = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if (esAdmin.rol === "admin") {
            for (const pedido of pedidos) {
                const fecha = pedido.fecha.split("T")[0].split("-").reverse().join("/"); 

                let nombresProductos = "";
                for (const producto of pedido.productos) {
                nombresProductos += producto.nombre + " x" + producto.cantidad + "<br>";
                }
                

                const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${pedido.usuarioId.id}</td>
                        <td>${fecha}</td>
                        <td>${nombresProductos}</td>
                        <td>$${pedido.total.toLocaleString("es-AR")}</td>
                    `;

                tbody.appendChild(fila);
        }
    }else{
            const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

            const pedidosUsuario = pedidos.filter(
                (pedido) => pedido.usuarioId.id === usuarioLogueado.id);

            for (const pedido of pedidosUsuario) {
                const fecha = pedido.fecha.split("T")[0].split("-").reverse().join("/"); 

                let nombresProductos = "";
                for (const producto of pedido.productos) {
                nombresProductos += producto.nombre + " x" + producto.cantidad + "<br>";
                }
                

                const fila = document.createElement("tr");
                fila.innerHTML = `
                <td>${fecha}</td>
                <td>${nombresProductos}</td>
                <td>$${pedido.total.toLocaleString("es-AR")}</td>
                `;

                tbody.appendChild(fila);
            }
        }

});