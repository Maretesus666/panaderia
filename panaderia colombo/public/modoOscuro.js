//vamos a configurar con algo de eventos, estilos y storage un modo oscuro/modo claro, que perdura la preferencia del usuario  aunque cierre la pestaña
let btnModoOscuro = document.getElementById("btnModoOscuro")
let estadoModoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
if(estadoModoOscuro === true){
    console.log("Está activado el MD oscuro")
    //que si capturo del storage que ES TRUE el md oscuro -> agrega la class al body
    document.body.classList = "modoOscuro"
    btnModoOscuro.innerText = "Light"
}else{
    console.log("el modo oscuro no es true")
    estadoModoOscuro = false
}
function cambiarModo(){
    //cambia por el contrario el valor de boolean
    estadoModoOscuro = !estadoModoOscuro
    //cambiar el text del btn
    if(estadoModoOscuro == false){
        btnModoOscuro.innerText ="Dark"
    }else{
        btnModoOscuro.innerText ="Light"
    }
    //setea el storage con el nuevo valor
    localStorage.setItem("modoOscuro", JSON.stringify(estadoModoOscuro))
    //toggle quita la class si existe o la agrega sino existe! ESTILOS SOLAMENTE
    document.body.classList.toggle("modoOscuro")
}
btnModoOscuro.addEventListener("click", cambiarModo)