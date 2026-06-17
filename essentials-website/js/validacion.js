const Validacion = {
  validarEmail: function(email) {
    return validator.isEmail(email);
  },

  validarPassword: function(password) {
    return !validator.isEmpty(password) && password.length >= 6;
  },

  validarLogin: function(email, password) {
    const errores = [];

    if (!Validacion.validarEmail(email)) {
      errores.push("El correo electrónico no es válido.");
    }

    if (!Validacion.validarPassword(password)) {
      errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    return errores;
  }
};