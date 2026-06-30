(function() {
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    if (usuarioLogueado) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const cuentaValida = usuarios.find(u => u.email === usuarioLogueado.email);
        
        if (!cuentaValida || cuentaValida.bloqueado) {
            localStorage.removeItem("usuarioLogueado");
            usuarioLogueado = null;
            alert(cuentaValida ? "Tu cuenta ha sido bloqueada." : "Tu cuenta ha sido eliminada por un administrador.");
            window.location.href = "login.html";
            return;
        }
    }

    const path = window.location.pathname;
    const paginaActual = path.substring(path.lastIndexOf('/') + 1) || 'inicio.html';
    const rol = usuarioLogueado ? usuarioLogueado.rol : 'invitado';

    if (rol === 'admin' && paginaActual !== 'panel-admin.html') {
        window.location.href = 'panel-admin.html';
        return;
    }

    if (rol === 'usuario' && paginaActual === 'panel-admin.html') {
        window.location.href = 'inicio.html';
        return;
    }

    if (rol === 'invitado') {
        const paginasPermitidas = ['inicio.html', 'productos.html', 'login.html', ''];
        if (!paginasPermitidas.includes(paginaActual)) {
            window.location.href = 'login.html';
            return;
        }
    }

    if (rol !== 'invitado' && paginaActual === 'login.html') {
        window.location.href = rol === 'admin' ? 'panel-admin.html' : 'inicio.html';
        return;
    }
})();

window.requiereAutenticacion = function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
};
