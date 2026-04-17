//2.	Se le solicita al usuario que ingrese el lado de un cuadrado. Realice el algoritmo para calcular e informar el perímetro y el área del cuadrado.

//me pide el lado cuadrado
let ladoCuadrado = Number(prompt("Ingrese el lado del cuadrado"))
//validar que el lado sea mayor 0 y sea un número
while(ladoCuadrado <= 0 || isNaN(ladoCuadrado)){
    ladoCuadrado = Number(prompt("Ingrese el lado del cuadrado. Tiene que ser mayor a cero y un númerico"))
}
let perimetro = ladoCuadrado * 4 
let area = ladoCuadrado * ladoCuadrado
console.log(`EL lado ingresado mide ${ladoCuadrado}, su perimetro es ${perimetro} y su área es ${area}`)
//tengo que devolver el perimetro: lado * 4 y el area: lado * lado