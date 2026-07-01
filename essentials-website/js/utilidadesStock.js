
function obtenerInfoStock(cantidad) {
  const num = parseInt(cantidad) || 0;
  
  if (num === 0) {
    return {
      textoTag: `SIN STOCK`,
      clase: "text-secondary",
      cantidad: 0
    };
  } else if (num < 5) {
    return {
      textoTag: `Últimas unidades`,
      clase: "text-danger",
      cantidad: num
    };
  } else if (num <= 20) {
    return {
      textoTag: `Stock medio`,
      clase: "text-warning",
      cantidad: num
    };
  } else {
    return {
      textoTag: `Stock alto`,
      clase: "text-success",
      cantidad: num
    };
  }
}

window.obtenerInfoStock = obtenerInfoStock;
