const productos = [
  {
    id: 1,
    categoria: "Pantalones",
    nombre: "Baggie azul",
    cantidadStock: 3,
    precio: 15000,
    imagen: "img/producto-1.webp",
    descuento: "-15% OFF"
  },
  {
    id: 2,
    categoria: "Remeras",
    nombre: "Remera regular fit",
    cantidadStock: 35,
    precio: 8000,
    imagen: "img/producto-2.webp",
    descuento: "-20% OFF"
  },
  {
    id: 3,
    categoria: "Camperas",
    nombre: "Campera Jean Hombre",
    cantidadStock: 12,
    precio: 25000,
    imagen: "img/producto-3.webp",
    descuento: "-10% OFF"
  },
  {
    id: 4,
    categoria: "Buzos",
    nombre: "Buzo Hoodie",
    cantidadStock: 4,
    precio: 18000,
    imagen: "img/producto-4.webp",
    descuento: "-25% OFF"
  },
  {
    id: 5,
    categoria: "Combos",
    nombre: "Conjunto 1",
    cantidadStock: 50,
    precio: 35000,
    imagen: "img/producto-5.webp",
    descuento: "-30% OFF"
  },
  {
    id: 6,
    categoria: "Accesorios",
    nombre: "Bag Negra",
    cantidadStock: 15,
    precio: 5000,
    imagen: "img/producto-6.jpg",
    descuento: "-15% OFF"
  },
  {
    id: 7,
    categoria: "Pantalones",
    nombre: "Baggie azul claro",
    cantidadStock: 25,
    precio: 15000,
    imagen: "img/producto-7.webp",
    descuento: "-20% OFF"
  },
  {
    id: 8,
    categoria: "Remeras",
    nombre: "Remera Relaxed",
    cantidadStock: 2,
    precio: 8500,
    imagen: "img/producto-8.webp",
    descuento: "-10% OFF"
  },
  {
    id: 9,
    categoria: "Camperas",
    nombre: "Campera Jean Mujer",
    cantidadStock: 8,
    precio: 24000,
    imagen: "img/producto-9.webp",
    descuento: "-25% OFF"
  },
  {
    id: 10,
    categoria: "Buzos",
    nombre: "Buzo Hoodie",
    cantidadStock: 40,
    precio: 18500,
    imagen: "img/producto-10.webp",
    descuento: "-30% OFF"
  },
  {
    id: 11,
    categoria: "Combos",
    nombre: "Conjunto 2",
    cantidadStock: 1,
    precio: 32000,
    imagen: "img/producto-11.jpg",
    descuento: "-15% OFF"
  },
  {
    id: 12,
    categoria: "Accesorios",
    nombre: "Mini bag Negra",
    cantidadStock: 10,
    precio: 4500,
    imagen: "img/producto-12.jpg",
    descuento: "-20% OFF"
  },
  {
    id: 13,
    categoria: "Pantalones",
    nombre: "Baggie azul oscuro",
    cantidadStock: 60,
    precio: 15500,
    imagen: "img/producto-13.webp",
    descuento: "-10% OFF"
  },
  {
    id: 14,
    categoria: "Remeras",
    nombre: "Remera Boxy fit",
    cantidadStock: 4,
    precio: 9000,
    imagen: "img/producto-14.webp",
    descuento: "-25% OFF"
  },
  {
    id: 15,
    categoria: "Camperas",
    nombre: "Campera Abrigo",
    cantidadStock: 18,
    precio: 45000,
    imagen: "img/producto-15.jpg",
    descuento: "-30% OFF"
  },
  {
    id: 16,
    categoria: "Buzos",
    nombre: "Buzo Hoodie",
    cantidadStock: 30,
    precio: 19000,
    imagen: "img/producto-16.webp",
    descuento: "-15% OFF"
  },
  {
    id: 17,
    categoria: "Combos",
    nombre: "Conjunto 3",
    cantidadStock: 2,
    precio: 38000,
    imagen: "img/producto-17.webp",
    descuento: "-20% OFF"
  },
  {
    id: 18,
    categoria: "Accesorios",
    nombre: "Mini bag mostaza",
    cantidadStock: 22,
    precio: 4800,
    imagen: "img/producto-18.jpg",
    descuento: "-10% OFF"
  },
  {
    id: 19,
    categoria: "Pantalones",
    nombre: "Baggie Negro",
    cantidadStock: 14,
    precio: 16000,
    imagen: "img/producto-19.webp",
    descuento: "-25% OFF"
  },
  {
    id: 20,
    categoria: "Remeras",
    nombre: "Remera Classic",
    cantidadStock: 1,
    precio: 7500,
    imagen: "img/producto-20.webp",
    descuento: "-30% OFF"
  },
  {
    id: 21,
    categoria: "Camperas",
    nombre: "Campera Softshell",
    cantidadStock: 45,
    precio: 32000,
    imagen: "img/producto-21.webp",
    descuento: "-15% OFF"
  },
  {
    id: 22,
    categoria: "Buzos",
    nombre: "Buzo Hoodie",
    cantidadStock: 11,
    precio: 20000,
    imagen: "img/producto-22.webp",
    descuento: "-20% OFF"
  },
  {
    id: 23,
    categoria: "Combos",
    nombre: "Conjunto Deportivo",
    cantidadStock: 100,
    precio: 28000,
    imagen: "img/producto-23.webp",
    descuento: "-10% OFF"
  },
  {
    id: 24,
    categoria: "Accesorios",
    nombre: "Bag Gris",
    cantidadStock: 4,
    precio: 5500,
    imagen: "img/producto-24.jpg",
    descuento: "-25% OFF"
  },
];

function inicializarProductos() {
  const localStock = localStorage.getItem("productos");
  if (!localStock) {
    localStorage.setItem("productos", JSON.stringify(productos));
    console.log("Productos cargados en LocalStorage por primera vez.");
  } else {
    let parsed = JSON.parse(localStock);
    let migrated = false;
    parsed = parsed.map(p => {
      if (p.estadoStock !== undefined) {
        migrated = true;
        if (p.estadoStock === "Últimas unidades") p.cantidadStock = 3;
        else if (p.estadoStock === "Stock medio") p.cantidadStock = 12;
        else p.cantidadStock = 35;
        
        delete p.estadoStock;
        delete p.claseStock;
      }
      return p;
    });
    if (migrated) {
      localStorage.setItem("productos", JSON.stringify(parsed));
      console.log("Productos migrados al nuevo formato de stock numérico.");
    }
  }
}

inicializarProductos();
