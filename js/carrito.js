// productos
let productos = [
    { id: 1, nombre: "Plan de entrenamiento N°1", precio: 15000 },
    { id: 2, nombre: "Plan de entrenamiento N°2", precio: 25000 },
    { id: 3, nombre: "Plan de entrenamiento N°3", precio: 30000 },
    { id: 4, nombre: "Remeras Hombre", precio: 10000 },
    { id: 5, nombre: "Remeras Mujer", precio: 8000 },
    { id: 6, nombre: "Musculosas Hombre", precio: 9000 },
    { id: 7, nombre: "Musculosas Mujer", precio: 6000 },
    { id: 8, nombre: "Short Hombre", precio: 6000 },
    { id: 9, nombre: "Calzas Mujer", precio: 4500 },
    { id: 10, nombre: "Pesas de 5kg", precio: 35000 },
    { id: 11, nombre: "Pesas de 10kg", precio: 50000 },
    { id: 12, nombre: "Pesas de 20kg", precio: 70000 },
];

// Carrito de compras
let carrito = [];

// Función para mostrar los productos en la página
function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";
    productos.forEach(producto => {
        const item = document.createElement("li");
        item.innerHTML = `${producto.nombre} - $${producto.precio} <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>`;
        listaProductos.appendChild(item);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
        const itemEnCarrito = carrito.find(item => item.id === id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        mostrarCarrito();
    }
}

// Evento para agregar productos al carrito
document.getElementById("lista-productos").addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        agregarAlCarrito(id);
    }
});

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    });
    calcularTotal();
}

// Función para calcular el subtotal y total del carrito
function calcularTotal() {
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const total = calcularDescuento(subtotal);
    document.getElementById("subtotal").textContent = `Subtotal: $${subtotal}`;
    document.getElementById("total").textContent = `Total: $${total}`;
}

// Calcular el Descuento
function calcularDescuento(subtotal) {
    //descuento del 10% si el subtotal es mayor a $100
    return subtotal > 100 ? subtotal * 0.9 : subtotal;
}

// Evento para vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", function () {
    vaciarCarrito();
});

// Función para guardar el carrito en Local Storage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde Local Storage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Función para vaciar el carrito y borrarlo de Local Storage
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
}




// Inicialización
mostrarProductos();
cargarCarritoDesdeLocalStorage();

