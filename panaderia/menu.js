let salirMenu = false

do{
    const entrada = prompt(`Ingrese la opción que desea
1 - Mostrar catálogo
2 - Agregar producto
3 - Eliminar producto
4 - Ordenar
5 - Buscar por nombre
6 - Buscar por categoría
7 - Buscar por nombre o categoría
8 - Agregar al carrito
9 - Quitar producto del carrito
10 - Finalizar compra
11 - Actualizar precio
12 - Ajustar stock
0 - Salir del menú`)
    if(entrada === null){
        console.log(`Menú cancelado. Saliendo.`)
        break
    }
    const opcion = entrada.trim()
    if(opcion.length === 0){
        console.log(`Ingrese una opción válida`)
        continue
    }
    switch(opcion){
        case "1":
            mostrarCatalogo(stockPanaderia)
            break
        case "2":
            agregarProducto(stockPanaderia)
            break
        case "3":
            eliminarProductoCatalogo(stockPanaderia)
            break
        case "4":
            const criterioEntrada = prompt(`Por qué criterio desea ordenar el stock:
A - Menor a mayor precio
B - Mayor a menor precio
C - Por nombre A-Z
D - Por nombre Z-A`)
            if(criterioEntrada === null){
                console.log(`Ordenación cancelada`)
                break
            }
            const criterio = criterioEntrada.trim().toUpperCase()
            switch(criterio){
                case "A":
                    ordenarMenorMayorPrecio(stockPanaderia)
                    break
                case "B":
                    ordenarMayorMenorPrecio(stockPanaderia)
                    break
                case "C":
                    ordenarPorNombreAZ(stockPanaderia)
                    break
                case "D":
                    ordenarPorNombreZA(stockPanaderia)
                    break
                default:
                    console.log(`Opción inválida ${criterioEntrada}`)
                    break
            }
            break
        case "5":
            buscarPorNombre(stockPanaderia)
            break
        case "6":
            buscarPorCategoria(stockPanaderia)
            break
        case "7":
            buscarNombreCategoria(stockPanaderia)
            break
        case "8":
            let seguirComprando = true
            while(seguirComprando){
                agregarCarrito(stockPanaderia, carrito)
                const seguir = prompt(`Desea seguir comprando S o N`)
                if(seguir === null){
                    seguirComprando = false
                } else {
                    const valor = seguir.trim().toUpperCase()
                    seguirComprando = valor === "S"
                }
            }
            break
        case "9":
            eliminarProductoCarrito(carrito)
            break
        case "10":
            carrito = finalizarCompra(carrito)
            console.log(`Carrito después de finalizar la compra`, carrito)
            break
        case "11":
            mostrarCatalogo(stockPanaderia)
            const productoActualizar = buscarPorIdNombre(stockPanaderia)
            if(!productoActualizar){
                console.log(`El producto que quieres actualizar no existe`)
            }else{
                productoActualizar.actualizarPrecio()
                console.log(productoActualizar)
            }
            break
        case "12":
            actualizarValorProducto(stockPanaderia)
            break
        case "0":
            console.log(`Salir del menú. Gracias por usar la panadería`)
            salirMenu = true
            break
        default:
            console.log(`La opción ${opcion} no existe`)
            break
    }
}while(!salirMenu)
