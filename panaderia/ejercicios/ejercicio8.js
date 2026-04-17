//8.	Realizar un sistema para registro de horas trabajadas. Se solicita que se ingrese el valor de la hora y la cantidad de horas trabajadas en el mes. Calcular y mostrar cuanto se facturaría durante ese mes y cual sería la proyección anual (considerando 12 meses al año) si ganaramos ese monto fijo los 11 meses siguientes.

//input 
let nombre = prompt(`Ingrese su nombre`)
//validar que nombre no sea vacio
//validar que cantHoras sea un númerico y no sea un not aNumber
let cantHoras = Number(prompt(`Hola ${nombre} :D Ingresa la cantidad de horas que trabajas por mes`))
//vlalidar que sea positivo y sea númerico 
let valorHora = Number(prompt(`Ingrese el valor de la hora`))

//calculo
let sueldoMensual = cantHoras * valorHora
let sueldoAnual = sueldoMensual * 12
//mostrar info
console.log(`Hola ${nombre} considerando que trabajas ${cantHoras}hs y por cada una te pagan ${valorHora} tu remuneración mensual sería ${sueldoMensual} y proyectas anualmente ${sueldoAnual} `)
alert(`Hola ${nombre} considerando que trabajas ${cantHoras}hs y por cada una te pagan ${valorHora} tu remuneración mensual sería ${sueldoMensual} y proyectas anualmente ${sueldoAnual} `)