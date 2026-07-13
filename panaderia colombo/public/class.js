
class Producto{
  constructor(id, categoria, nombre, precio, stock, imagen) {
    this.id = id;
    this.categoria = categoria;
    this.titulo = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.cantidad = 1;
  }

  sumarUnidad() {
    if (this.cantidad < this.stock) {
      this.cantidad++;
    }
  }

  restarUnidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}

let biblioteca = [];
let carrito = [];

function obtenerImagen(index) {
  const imagenes = ["bolitas.jpg", "dulcedeleche.jpg", "maicena.jpg", "librito.jpg", "canon.jpg"];
  return imagenes[index % imagenes.length];
}

async function cargarProductos() {
  try {
    const respuesta = await fetch("/catalogoPanaderia");
    const productosData = await respuesta.json();
    biblioteca = productosData.map((producto, index) => new Producto(producto.id, producto.autor || "Panadería", producto.titulo, producto.precio, producto.stock, producto.imagen || obtenerImagen(index)));
  } catch (error) {
    biblioteca = [
      new Producto(1, "Panadería", "bolitas", 750, 12, "bolitas.jpg"),
      new Producto(2, "Panadería", "dulcedeleche", 900, 8, "dulcedeleche.jpg"),
      new Producto(3, "Panadería", "maicena", 650, 15, "maicena.jpg"),
      new Producto(4, "Panadería", "librito", 620, 10, "librito.jpg"),
      new Producto(5, "Panadería", "canon", 780, 9, "canon.jpg")
    ];
  }
}

if (localStorage.getItem("carrito")) {
  const productosGuardados = JSON.parse(localStorage.getItem("carrito"));
  carrito = productosGuardados.map((producto) => new Producto(producto.id, producto.categoria, producto.titulo, producto.precio, producto.stock, producto.imagen));
}

cargarProductos();
