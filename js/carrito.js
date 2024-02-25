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
    // Mostrar el contador del carrito
    mostrarContadorCarrito();
    guardarCarritoEnLocalStorage();
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
    // Mostrar el contador del carrito
    mostrarContadorCarrito();

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
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres vaciar el carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d030d6',
        cancelButtonColor: '010023',
        confirmButtonText: 'Sí, vaciar carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            Swal.fire(
                'Carrito vaciado',
                'El carrito ha sido vaciado correctamente.',
                'success'
            );
        }
    });
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

function mostrarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

mostrarProductos();
cargarCarritoDesdeLocalStorage();


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
        // Mostrar cartel de confirmación
        mostrarCartelConfirmacion(producto);
    }
    // Mostrar el contador del carrito
    mostrarContadorCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para mostrar el cartel de confirmación
function mostrarCartelConfirmacion(producto) {
    Swal.fire({
        title: 'Producto Agregado!',
        text: `Se agregó ${producto.nombre} al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    mostrarCarritosOrdenados();

}


document.getElementById("btn-generar-receta").addEventListener("click", function() {
    const tipoEntrenamiento = document.getElementById("tipo-entrenamiento").value;
    obtenerRecetaPorTipoEntrenamiento(tipoEntrenamiento);
});

function obtenerRecetaPorTipoEntrenamiento(tipoEntrenamiento) {
    // Hacer una solicitud a la API de TheMealDB para obtener una receta aleatoria basada en el tipo de entrenamiento
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php?c=${tipoEntrenamiento}`)
    .then(response => response.json())
    .then(data => {
        // Mostrar la receta en la página web
        mostrarReceta(data.meals[0]);
    })
    .catch(error => {
        console.error("Error al obtener la receta:", error);
    });
}

function mostrarReceta(receta) {
    const recetaContainer = document.getElementById("receta");
    recetaContainer.innerHTML = `
        <h2>${receta.strMeal}</h2>
        <img src="${receta.strMealThumb}" alt="Imagen de la receta">
        <h3>Ingredientes:</h3>
        <ul>
            ${listarIngredientes(receta)}
        </ul>
        <h3>Instrucciones de preparación:</h3>
        <p>${receta.strInstructions}</p>
    `;
}

function listarIngredientes(receta) {
    let ingredientes = "";
    for (let i = 1; i <= 20; i++) {
        if (receta[`strIngredient${i}`]) {
            ingredientes += `<li>${receta[`strMeasure${i}`]} ${receta[`strIngredient${i}`]}</li>`;
        }
    }
    return ingredientes;
}



