//espacio de memoria que accedo a sus elementos por posición o indice

//array vacio 
let primerArray = []
console.log(primerArray)
const IVA = 21
//array de numeros
let numeros = [25,98,33,31,87,99,505]
console.log(numeros)

//arrays de string
let arrayString = ["nube", "mate", "lluvia", "humedad"]
console.log(arrayString) 

//arrays de varios 
let arrayVarios = [false, "mermelada", 57, "yerba", true]
console.log(arrayVarios)
//arrays con de todo
let arraysRandom = [numeros, {autor: "Borges", titulo:"Aleph", precio: 999}, true, arrayVarios, 88, "hola", undefined, "", ,NaN, 65, IVA, 76]
console.log(arraysRandom)
//propiedad: la cantidad que tiene ese array
console.log(numeros.length)
console.log(arrayString.length)
console.log(arraysRandom.length)
//cómo accedo a cada posición
console.log(numeros[4])
//for(desde, hasta, cómo se maneja esa variable)
//for con la prop length que me sirve para recorrer el array elemento elemento y hacer
for(let i = 0; i <numeros.length; i++){
    console.log(2 * numeros[i])
}
for(let i = 0; i < arrayVarios.length;i++){
    console.log(`En el elemento n° ${i} hay ${arrayVarios[i]}`)
}

//for of otra forma de escribir un for que me permite recorrer un aray elemento a elemento
for(let numero of numeros){
    console.log(numero)
}

//MÉTODOS DE ARRAYS: son métodos que sólo le puedo aplicar a los arrays que hacen una tarea puntual
//agregar elementos: 
//push: suma elemento al final  
console.log(numeros)
numeros.push(22)
numeros.push(7,11,82)
console.log(numeros)
//unshift elemento se agrega al principio del array
numeros.unshift(3, 5)
console.log(numeros)

//métodos para eliminar 
//pop elimina el elementos del final
numeros.pop()
numeros.pop()
numeros.pop()
numeros.pop()
//shift remueve el primer elemento del array
numeros.shift()
numeros.shift()
numeros.shift()

console.log(numeros)

//join: devuelve una cadena de texto
console.log(numeros.join(" - "))
console.log(numeros.join("/"))

//indexOf es un método que busca como valor en los distintos elementos del array lo que pase como argumento, cuando encuentra algo que coincida devuelve el indice de ese elemento SINO devuelve -1
console.log(arrayVarios.indexOf("yerba"))

//metodo concat me permite concatenar dos arrays

let perros = ["Tyson", "Luna", "Hodor"]
let gatos = ["Michi", "Sol", "Robin", "Garfield"]
let mascostas= gatos.concat(perros)
console.log(mascostas)

// let numeros = [25,98,33,31,87,99,505]
//agregar despues del 33 la palabra "almacen" y eliminar el 31, 87 y 99
//splice 
//documentación: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

//tres parámetros 1° donde empiezo a laburar, 2° cuantos quiero eliminar 3° elemento que quiero

let numerosB = [25,98,33,31,87,99,505]
//elimino y agrego
numerosB.splice(3, 3, "almacen")
//sólo elimina
numerosB.splice(0,1)
//solo agrega
numerosB.splice(0,0, 56)
console.log(numerosB)