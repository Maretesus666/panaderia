const express = require("express");
const cors = require("cors");

const app = express();
const puerto = 3000;

const productosCatalogo = [
  { id: 1, titulo: "Bolitas de grasa", autor: "Panadería", precio: 750, stock: 12, imagen: "bolitas.jpg" },
  { id: 2, titulo: "Dulce de leche", autor: "Panadería", precio: 900, stock: 8, imagen: "dulcedeleche.jpg" },
  { id: 3, titulo: "Maicena", autor: "Panadería", precio: 650, stock: 15, imagen: "maicena.jpg" },
  { id: 4, titulo: "Librito", autor: "Panadería", precio: 620, stock: 10, imagen: "librito.jpg" },
  { id: 5, titulo: "Cañón", autor: "Panadería", precio: 780, stock: 9, imagen: "canon.jpg" }
];

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/catalogoPanaderia", (req, res) => {
  res.json(productosCatalogo);
});

app.post("/finalizarPedido", (req, res) => {
  const carrito = req.body || [];

  carrito.forEach((item) => {
    const producto = productosCatalogo.find((productoCatalogo) => productoCatalogo.id === item.id);
    if (producto) {
      producto.stock = Math.max(0, producto.stock - (Number(item.cantidad) || 1));
    }
  });

  res.json({ ok: true, mensaje: "Pedido confirmado" });
});

app.get("/", (req, res) => res.render("index", { productos: productosCatalogo }));
app.get("/contacto", (req, res) => res.render("contacto"));
app.get("/panesEspeciales", (req, res) => res.render("panesEspeciales"));

app.listen(puerto, () => {
  console.log(`La panadería está disponible en http://localhost:${puerto}/`);
});