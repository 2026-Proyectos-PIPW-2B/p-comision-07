(function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const path = window.location.pathname;
    
    // Obtenemos el nombre del archivo actual (ej: 'productos.html')
    // Si el path termina en '/', asumimos que es el index/inicio
    const paginaActual = path.substring(path.lastIndexOf('/') + 1) || 'inicio.html';

    const rol = usuarioLogueado ? usuarioLogueado.rol : 'invitado';

    // 1. Reglas para Administrador
    if (rol === 'admin' && paginaActual !== 'panel-admin.html') {
        window.location.href = 'panel-admin.html';
        return;
    }

    // 2. Reglas para Usuario normal
    if (rol === 'usuario' && paginaActual === 'panel-admin.html') {
        window.location.href = 'inicio.html';
        return;
    }

    // 3. Reglas para Invitados
    if (rol === 'invitado') {
        const paginasPermitidas = ['inicio.html', 'productos.html', 'login.html', ''];
        if (!paginasPermitidas.includes(paginaActual)) {
            window.location.href = 'login.html';
            return;
        }
    }

    // 4. Extra: Si el usuario ya está logueado, no debería ver el login
    if (rol !== 'invitado' && paginaActual === 'login.html') {
        window.location.href = rol === 'admin' ? 'panel-admin.html' : 'inicio.html';
        return;
    }
})();

// Función auxiliar para proteger interacciones específicas (Añadir al carrito)
window.requiereAutenticacion = function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
        return false; // Interrumpe la acción
    }
    return true; // Permite la acción
};
