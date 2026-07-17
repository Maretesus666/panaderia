const mysql = require("promise-mysql");

let conexion = null;

async function crearConexion() {
  if (conexion) {
    return conexion;
  }

  try {
    conexion = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "librosPlana"
    });

    return conexion;
  } catch (error) {
    console.warn("No se pudo conectar a la base de datos SQL:", error.message);
    return null;
  }
}

module.exports = { crearConexion };