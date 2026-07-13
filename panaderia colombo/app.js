const express = require("express");
const cors = require("cors");
const database = require("./database.js");

const app = express();
const puerto = 3000;

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/catalogoPanaderia", async (req, res) => {
  const productosFallback = [
    { id: 1, titulo: "bolitas", autor: "Panadería", precio: 750, stock: 12, imagen: "bolitas.jpg" },
    { id: 2, titulo: "dulcedeleche", autor: "Panadería", precio: 900, stock: 8, imagen: "dulcedeleche.jpg" },
    { id: 3, titulo: "maicena", autor: "Panadería", precio: 650, stock: 15, imagen: "maicena.jpg" },
    { id: 4, titulo: "librito", autor: "Panadería", precio: 620, stock: 10, imagen: "librito.jpg" },
    { id: 5, titulo: "canon", autor: "Panadería", precio: 780, stock: 9, imagen: "canon.jpg" }
  ];

  try {
    const conexion = await database.crearConexion();

    if (!conexion) {
      return res.json(productosFallback);
    }

    const productos = await conexion.query("SELECT * FROM libro ORDER BY id");
    return res.json(productos.length ? productos : productosFallback);
  } catch (error) {
    return res.json(productosFallback);
  }
});

app.post("/finalizarPedido", async (req, res) => {
  const carrito = req.body || [];

  try {
    const conexion = await database.crearConexion();
    for (const item of carrito) {
      await conexion.query(`UPDATE libro SET stock = stock - ${item.cantidad} WHERE id = ${item.id}`);
    }
    res.json({ ok: true, mensaje: "Pedido confirmado" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "No se pudo confirmar el pedido" });
  }
});

app.get("/", (req, res) => res.render("index"));
app.get("/contacto", (req, res) => res.render("contacto"));
app.get("/panesEspeciales", (req, res) => res.render("panesEspeciales"));

app.listen(puerto, () => {
  console.log(`La panadería está disponible en http://localhost:${puerto}/`);
});