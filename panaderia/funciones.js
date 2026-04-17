function pedirTextoNoVacio(mensaje){
    let valor
    do{
        valor = prompt(mensaje)
        if(valor === null){
            return null
        }
        valor = valor.trim()
        if(valor.length === 0){
            console.log(`Debe ingresar un valor válido`)
        }
    }while(valor.length === 0)
    return valor
}

function pedirNumeroPositivo(mensaje, allowZero = false){
    let valor
    let numero
    do{
        valor = prompt(mensaje)
        if(valor === null){
            return null
        }
        numero = Number(valor)
        if(isNaN(numero) || (!allowZero ? numero <= 0 : numero < 0) || !Number.isFinite(numero)){
            console.log(`Debe ingresar un número válido${allowZero ? ' mayor o igual a 0' : ' mayor a 0'}`)
        }
    }while(isNaN(numero) || (!allowZero ? numero <= 0 : numero < 0) || !Number.isFinite(numero))
    return numero
}

function agregarProducto(stock){
    const nombre = pedirTextoNoVacio(`Ingrese el nombre del producto`)
    if(nombre === null) return
    const categoria = pedirTextoNoVacio(`Ingrese la categoria de ${nombre}`)
    if(categoria === null) return
    const precio = pedirNumeroPositivo(`Ingrese el precio de ${nombre}`)
    if(precio === null) return
    const cantidad = pedirNumeroPositivo(`Ingrese el stock inicial de ${nombre}`, true)
    if(cantidad === null) return
    const existe = stock.find((item)=> item.nombre.toLowerCase() === nombre.toLowerCase() && item.categoria.toLowerCase() === categoria.toLowerCase())
    if(existe){
        console.log(`El producto ya existe en el stock`)
        return
    }
    const productoNuevo = new Producto(stock.length + 1, nombre, categoria, precio, cantidad)
    stock.push(productoNuevo)
    productoNuevo.mostrarInfo()
}

function mostrarCatalogo(array){
    if(array.length === 0){
        console.log(`No hay productos para mostrar`)
        return
    }
    array.forEach((producto)=> producto.mostrarCatalogo())
}

function buscarPorCategoria(array){
    const categoriaBuscada = pedirTextoNoVacio(`Ingrese la categoria que desea buscar`)
    if(categoriaBuscada === null) return
    const coincidencias = array.filter((item)=> item.categoria.toLowerCase() === categoriaBuscada.toLowerCase())
    if(coincidencias.length === 0){
        console.log(`No hay productos en la categoria ${categoriaBuscada}`)
    }else{
        mostrarCatalogo(coincidencias)
    }
}

function buscarPorNombre(array){
    const nombreBuscado = pedirTextoNoVacio(`Ingrese el nombre del producto que desea encontrar`)
    if(nombreBuscado === null) return
    const productoEncontrado = array.find((item)=> item.nombre.toLowerCase() === nombreBuscado.toLowerCase())
    if(!productoEncontrado){
        console.log(`No existe un producto con el nombre ${nombreBuscado}`)
    }else{
        productoEncontrado.mostrarCatalogo()
    }
}

function eliminarProductoCatalogo(array){
    if(array.length === 0){
        console.log(`No hay productos en el catalogo`)
        return
    }
    mostrarCatalogo(array)
    const productoEliminar = buscarPorIdNombre(array)
    if(!productoEliminar){
        console.log(`No se encontro el producto para eliminar`)
        return
    }
    const indice = array.indexOf(productoEliminar)
    array.splice(indice, 1)
    mostrarCatalogo(array)
}

function buscarNombreCategoria(array){
    const texto = pedirTextoNoVacio(`Ingrese el nombre o categoria que esta buscando`)
    if(texto === null) return
    const filtro = texto.toLowerCase()
    const coincidencias = array.filter((item)=> item.nombre.toLowerCase().includes(filtro) || item.categoria.toLowerCase().includes(filtro))
    if(coincidencias.length === 0){
        console.log(`No hay coincidencias para ${texto}`)
    }else{
        mostrarCatalogo(coincidencias)
    }
}

function ordenarMenorMayorPrecio(array){
    const ordenado = array.slice().sort((a,b)=> a.precio - b.precio)
    mostrarCatalogo(ordenado)
}

function ordenarMayorMenorPrecio(array){
    const ordenado = array.slice().sort((a,b)=> b.precio - a.precio)
    mostrarCatalogo(ordenado)
}

function ordenarPorNombreAZ(array){
    const ordenado = array.slice().sort((a,b)=> a.nombre.localeCompare(b.nombre))
    mostrarCatalogo(ordenado)
}

function ordenarPorNombreZA(array){
    const ordenado = array.slice().sort((a,b)=> b.nombre.localeCompare(a.nombre))
    mostrarCatalogo(ordenado)
}

function agregarCarrito(stock, carrito){
    if(stock.length === 0){
        console.log(`No hay productos disponibles`)
        return
    }
    mostrarCatalogo(stock)
    const idProducto = pedirNumeroPositivo(`Ingrese el id del producto que desea agregar al carrito`)
    if(idProducto === null) return
    const productoElegido = stock.find((item)=> item.id === idProducto)
    if(!productoElegido){
        console.log(`No existe un producto con id ${idProducto}`)
    }else{
        carrito.push(productoElegido)
        console.log(`Producto agregado al carrito`)
        mostrarCarrito(carrito)
    }
}

function mostrarCarrito(carrito){
    if(carrito.length === 0){
        console.log(`El carrito esta vacio`)
        return
    }
    carrito.forEach((item)=> item.mostrarCarrito())
}

function eliminarProductoCarrito(arrayCarrito){
    if(arrayCarrito.length === 0){
        console.log(`El carrito esta vacio`)
        return
    }
    mostrarCarrito(arrayCarrito)
    const productoEliminar = buscarPorIdNombre(arrayCarrito)
    if(!productoEliminar){
        console.log(`No se encontro el producto en el carrito`)
        return
    }
    const indice = arrayCarrito.indexOf(productoEliminar)
    arrayCarrito.splice(indice, 1)
    mostrarCarrito(arrayCarrito)
}

function calcularTotal(arrayCarrito){
    const total = arrayCarrito.reduce((suma, item)=> suma + item.precio, 0)
    console.log(`Total de la compra: ${total}`)
    return total
}

function finalizarCompra(arrayCarrito){
    if(arrayCarrito.length === 0){
        console.log(`No hay productos en el carrito`)
        return arrayCarrito
    }
    calcularTotal(arrayCarrito)
    console.log(`Compra finalizada`)
    return []
}

function buscarPorIdNombre(array){
    const valor = pedirTextoNoVacio(`Ingrese el id o el nombre del producto`)
    if(valor === null) return null
    return array.find((item)=> item.id == valor || item.nombre.toUpperCase() === valor.toUpperCase())
}

function actualizarValorProducto(arrayStock){
    const producto = buscarPorIdNombre(arrayStock)
    if(!producto){
        console.log(`No se encontro el producto`)
        return
    }
    const atributo = pedirTextoNoVacio(`Ingrese el atributo a modificar: nombre, categoria, precio o stock`)
    if(atributo === null) return
    const campo = atributo.toLowerCase()
    if(campo === "nombre"){
        const nuevoNombre = pedirTextoNoVacio(`Ingrese el nuevo nombre para ${producto.nombre}`)
        if(nuevoNombre !== null){
            producto.nombre = nuevoNombre
            console.log(producto)
        }
    } else if(campo === "categoria"){
        const nuevaCategoria = pedirTextoNoVacio(`Ingrese la nueva categoria para ${producto.nombre}`)
        if(nuevaCategoria !== null){
            producto.categoria = nuevaCategoria
            console.log(producto)
        }
    } else if(campo === "precio"){
        const nuevoPrecio = pedirNumeroPositivo(`Ingrese el nuevo precio para ${producto.nombre}`)
        if(nuevoPrecio !== null){
            producto.precio = nuevoPrecio
            console.log(producto)
        }
    } else if(campo === "stock"){
        const nuevoStock = pedirNumeroPositivo(`Ingrese el nuevo stock para ${producto.nombre}`,true)
        if(nuevoStock !== null){
            producto.stock = nuevoStock
            console.log(producto)
        }
    } else {
        console.log(`Atributo invalido: ${atributo}`)
    }
}
