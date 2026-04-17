
class Producto{
    constructor(id, nombre, categoria, precio, stock){
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
        this.stock = stock
    }
    mostrarInfo(){
        console.log(`Producto: ${this.nombre}, categoría: ${this.categoria}, precio: ${this.precio}, stock: ${this.stock}`)
    }
    mostrarCatalogo(){
        console.log(this.id, this.nombre, this.categoria, this.precio, this.stock)
    }
    mostrarCarrito(){
        console.log(this.id, this.nombre, this.precio)
    }
    actualizarPrecio(){
        let ingreso
        let nuevoPrecio
        do{
            ingreso = prompt(`Ingrese el nuevo precio de ${this.nombre} (actual ${this.precio})`)
            if(ingreso === null){
                console.log(`Actualización de precio cancelada`)
                return
            }
            nuevoPrecio = Number(ingreso)
            if(isNaN(nuevoPrecio) || nuevoPrecio < 1){
                console.log(`Debe ingresar un número mayor a 0`)
            }
        }while(isNaN(nuevoPrecio) || nuevoPrecio < 1)
        this.precio = nuevoPrecio
        console.log(`El precio de ${this.nombre} ahora es ${this.precio}`)
    }
    actualizarStock(){
        let ingreso
        let cantidad
        do{
            ingreso = prompt(`Ingrese la cantidad de stock a sumar para ${this.nombre}`)
            if(ingreso === null){
                console.log(`Actualización de stock cancelada`)
                return
            }
            cantidad = Number(ingreso)
            if(isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad < 0){
                console.log(`Debe ingresar un número entero mayor o igual a 0`)
            }
        }while(isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad < 0)
        this.stock += cantidad
        console.log(`Stock actualizado de ${this.nombre}: ${this.stock}`)
    }
}

const producto1 = new Producto(1, "Pan de campo", "Panadería", 450, 30)
const producto2 = new Producto(2, "Medialuna", "Panadería", 180, 45)
const producto3 = new Producto(3, "Budín de limón", "Repostería", 320, 18)
const producto4 = new Producto(4, "Tarta de jamón y queso", "Salados", 950, 12)
const producto5 = new Producto(5, "Facturas mixtas", "Panadería", 220, 40)
const producto6 = new Producto(6, "Brioches", "Repostería", 380, 22)
const producto7 = new Producto(7, "Sándwich de miga", "Salados", 720, 15)
const producto8 = new Producto(8, "Pan integral", "Panadería", 510, 25)

let stockPanaderia = []
stockPanaderia.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8)
let carrito = []

