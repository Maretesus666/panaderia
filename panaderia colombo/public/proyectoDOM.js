let DateTime = luxon.DateTime;

let containerLibros = document.getElementById("containerLibros");
let titulo = document.getElementById("tituloPrincipal");
let buscador = document.getElementById("buscador");
let selectOrden = document.getElementById("selectOrden");
let modalBodyCarrito = document.getElementById("modalBodyCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let totalCarrito = document.getElementById("totalCarrito");
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
let reloj = document.getElementById("reloj");

titulo.innerText = "Panes recién horneados";

function imprimirCatalogo(array = []) {
  containerLibros.innerHTML = "";

  array.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4 mb-4";
    const imagen = producto.imagen ? `/assets/${producto.imagen}` : "/assets/bolitas.jpg";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${imagen}" class="card-img-top" alt="${producto.titulo}" style="height: 220px; object-fit: cover;" onerror="this.onerror=null; this.src='/assets/bolitas.jpg'; this.style.objectFit='cover';">
        <div class="card-body">
          <h4 class="card-title">${producto.titulo}</h4>
          <p class="card-text">${producto.categoria}</p>
          <p class="card-text">Precio: $${producto.precio}</p>
          <p class="card-text">Stock: ${producto.stock}</p>
          <button class="btn btn-success" id="btnAgregar${producto.id}">Agregar al pedido</button>
        </div>
      </div>
    `;

    containerLibros.append(card);

    document.getElementById(`btnAgregar${producto.id}`).addEventListener("click", () => {
      agregarProductoCarrito(producto);
    });
  });
}

function agregarProductoCarrito(producto) {
  const existe = carrito.find((item) => item.id === producto.id);

  if (!existe) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Toastify({ text: `${producto.titulo} agregado al pedido`, duration: 2200, gravity: "bottom", position: "center", style: { background: "#b5651d", color: "white" } }).showToast();
  } else {
    existe.sumarUnidad();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Toastify({ text: `${producto.titulo} ahora tiene ${existe.cantidad} unidades`, duration: 2200, gravity: "bottom", position: "center", style: { background: "#8b5e3c", color: "white" } }).showToast();
  }
}

function buscarProducto(valorBuscar, array) {
  const coincidencias = array.filter((item) => item.titulo.toLowerCase().includes(valorBuscar.toLowerCase()));
  imprimirCatalogo(coincidencias);
}

function ordenarMayorMenor(array) {
  const copia = [...array].sort((a, b) => b.precio - a.precio);
  imprimirCatalogo(copia);
}

function ordenarMenorMayor(array) {
  const copia = [...array].sort((a, b) => a.precio - b.precio);
  imprimirCatalogo(copia);
}

function ordenarPorTituloAZ(array) {
  const copia = [...array].sort((a, b) => a.titulo.localeCompare(b.titulo));
  imprimirCatalogo(copia);
}

function imprimirCarrito(array) {
  modalBodyCarrito.innerHTML = "";

  if (array.length === 0) {
    modalBodyCarrito.innerHTML = "<p class='text-muted'>Tu pedido está vacío.</p>";
    totalCarrito.innerText = "Total: $0";
    return;
  }

  array.forEach((producto) => {
    modalBodyCarrito.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5>${producto.titulo}</h5>
          <p>Precio unitario: $${producto.precio}</p>
          <p>Unidades: ${producto.cantidad}</p>
          <p>Subtotal: $${producto.cantidad * producto.precio}</p>
          <button class="btn btn-outline-success btn-sm" id="btnSumar${producto.id}">+1</button>
          <button class="btn btn-outline-danger btn-sm" id="btnRestar${producto.id}">-1</button>
          <button class="btn btn-danger btn-sm" id="btnEliminar${producto.id}">Eliminar</button>
        </div>
      </div>
    `;
  });

  array.forEach((producto) => {
    document.getElementById(`btnSumar${producto.id}`).addEventListener("click", () => {
      producto.sumarUnidad();
      localStorage.setItem("carrito", JSON.stringify(array));
      imprimirCarrito(carrito);
    });

    document.getElementById(`btnRestar${producto.id}`).addEventListener("click", () => {
      producto.restarUnidad();
      localStorage.setItem("carrito", JSON.stringify(array));
      imprimirCarrito(carrito);
    });

    document.getElementById(`btnEliminar${producto.id}`).addEventListener("click", () => {
      const index = carrito.findIndex((item) => item.id === producto.id);
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      imprimirCarrito(carrito);
    });
  });

  calcularTotal(array);
}

function calcularTotal(array) {
  const total = array.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
  totalCarrito.innerText = `Total: $${total}`;
  return total;
}

async function peticionFinalizarCompra(arrayCarrito) {
  const respuesta = await fetch("http://localhost:3000/finalizarPedido", {
    method: "POST",
    body: JSON.stringify(arrayCarrito),
    headers: { "Content-Type": "application/json" }
  });

  if (respuesta.ok) {
    Swal.fire({ title: "Pedido confirmado", text: "Gracias por comprar en la panadería", icon: "success" });
  }
}

function finalizarCompra(array) {
  if (array.length >= 1) {
    peticionFinalizarCompra(array);
    carrito = [];
    localStorage.removeItem("carrito");
    imprimirCarrito(carrito);
    return carrito;
  }
}

buscador.addEventListener("input", () => {
  buscarProducto(buscador.value, biblioteca);
});

selectOrden.addEventListener("change", () => {
  switch (selectOrden.value) {
    case "1":
      ordenarMayorMenor(biblioteca);
      break;
    case "2":
      ordenarMenorMayor(biblioteca);
      break;
    case "3":
      ordenarPorTituloAZ(biblioteca);
      break;
    default:
      imprimirCatalogo(biblioteca);
  }
});

botonCarrito.addEventListener("click", () => {
  imprimirCarrito(carrito);
});

botonFinalizarCompra.addEventListener("click", () => {
  Swal.fire({
    title: "¿Confirmás tu pedido?",
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "Seguir mirando"
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = finalizarCompra(carrito);
    }
  });
});

setTimeout(() => {
  localStorage.removeItem("carrito");
  imprimirCatalogo(biblioteca);
}, 500);

setInterval(() => {
  const hora = DateTime.now();
  reloj.innerText = hora.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
}, 1000);