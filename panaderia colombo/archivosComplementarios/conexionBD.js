//PRACTICAR CÖMO CREAR UNA CONEION Y CONECTARME. ADEMAS HACER

//probar desde l terminal qu el archivo está linkeado
console.log("Prueba archivo linkeado")

//traernos la libreria de my sql

let mysql = require("mysql")
//console.log(mysql)

//creamos y configuramos nuestra conexión:
//con los atributos del object que recibe como parametro: le decimos el host, la clave, usuario Y LA BASE DE DATOS
let conexionLibrosPlana = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "librosPlana"
}
)
//crear una conexión
let conexionVeterinaria = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "veterinaria"
}
)
//conexiíon ya creada, con método connect sobre la conexión ----> ME CONTECTO, es decir, REALIZO LA ACCIÖN DE CONECTARME
conexionLibrosPlana.connect((error)=>{
    if(error){
       throw error
    }else{
        console.log("Nos conectamos a la BD 👌😊")
    }
})
//empezamos con consultas(SENTIDO AMPLIO - CUALQUIER ACCION DEL CRUD - ABM)
//primer parametro de query: LA INSTRUCCION -- en este caso un select
//segundo parametro es una function que tiene dos parametros el primero error, el segundo es la data de esa consulta
conexionLibrosPlana.query(`SELECT titulo, autor, precio from libro where autor = "Jorge Luis Borges"`, (error, data)=>{
    if(error){
        throw error
    }else{
        console.log(data)
        for(let elem of data){
            console.log(elem.titulo, elem.autor, elem.precio)
        }
    }
})

// conexionLibrosPlana.query(`UPDATE libro set precio = precio +100 where autor = "Jorge Luis Borges"`, (error, data)=>{
//     if(error){
//         throw error
//     }else{
//         console.log(data)
        
//     }
// })



//crear una function que agregue un libro, que reciba de forma dinamica: todos los atributos del form
function agregarLibroBD(aut, tit,prec,st){
    conexionLibrosPlana.query(`INSERT INTO libro(autor, titulo, precio, stock, imagen) VALUES ("${aut}", "${tit}", ${prec}, ${st}, "nuevoLibro.jpg")`, (error, data)=>{
        if(error){
        throw error
    }else{
        console.log(data)
        
    }
    })
}
// agregarLibroBD("Fran", "Aprender Consultas", 1900, 12)
//una function que filtre por autor y/o titulo
//una function que actulice algún atributo stock o precio
//opcional, a los 5 seg doy de baja la conexión, ya que le paso el método end()
setTimeout(()=>{
    console.log("Finalizada la conexión")
    conexionLibrosPlana.end()
}, 5000)
// setTimeout(()=>{
//     console.log(3000)
// },3000)
// setInterval(()=>{
//     console.log("hola")
// }, 5000)