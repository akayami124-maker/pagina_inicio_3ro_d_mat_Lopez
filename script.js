// Array de productos con archivos locales sueltos en la raíz
const productos = [
    { id: 1, nombre: "Parrillada Personal", categoria: "combos", descripcion: "Un jugoso bife, chorizo, papas y ensalada.", precio: 8.99, imagen: "parrillada1.jpg" },
    { id: 2, nombre: "Bife Premium", categoria: "cortes", descripcion: "Corte premium asado, acompañado de yuca.", precio: 12.50, imagen: "bife1.jpg" },
    { id: 3, nombre: "Combo Familiar", categoria: "combos", descripcion: "2 Bifes, chuletas, chorizos, papas y gaseosa.", precio: 24.99, imagen: "combo1.jpg" },
    { id: 4, nombre: "Costillas BBQ", categoria: "cortes", descripcion: "Costillar tierno bañado en salsa BBQ artesanal.", precio: 10.99, imagen: "costillas1.jpg" },
    { id: 5, nombre: "Gaseosa Mediana", categoria: "bebidas", descripcion: "Refrescante gaseosa ideal para acompañar.", precio: 1.50, imagen: "gaseosa1.jpg" },
    { id: 6, nombre: "Té Frío", categoria: "bebidas", descripcion: "Té helado con limón.", precio: 1.75, imagen: "te1.jpg" }
];

function renderMenu(productosAListar) {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    productosAListar.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-container"><img src="${producto.imagen}" class="product-img"></div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="product-desc">${producto.descripcion}</p>
                <div class="product-footer">
                    <span class="product-price">$${producto.precio.toFixed(2)}</span>
                    <button class="btn-add" onclick="openModal('¡Añadido!', 'Has seleccionado ${producto.nombre}.')">Agregar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterMenu(categoria) {
    if (categoria === 'todos') {
        renderMenu(productos);
    } else {
        renderMenu(productos.filter(p => p.categoria === categoria));
    }
}

// ==== CARRUSEL DINÁMICO DE 3 VIDEOS DE FONDO ====
let indiceVideoActual = 0;
let videosHero = [];

function inicializarCarruselVideos() {
    videosHero = document.querySelectorAll('.hero-video');
    if (videosHero.length === 0) return;

    videosHero[indiceVideoActual].play().catch(e => console.log("Autoplay bloqueado:", e));

    videosHero.forEach((video) => {
        video.addEventListener('ended', () => {
            transicionarSiguienteVideo();
        });
    });
}

function transicionarSiguienteVideo() {
    if (videosHero.length === 0) return;

    videosHero[indiceVideoActual].classList.remove('active');
    
    indiceVideoActual = (indiceVideoActual + 1) % videosHero.length;
    
    const siguienteVideo = videosHero[indiceVideoActual];
    siguienteVideo.currentTime = 0;
    siguienteVideo.classList.add('active');
    siguienteVideo.play().catch(e => console.log("Error al reproducir siguiente video:", e));
}


// ==== LÓGICA DE INTERFACES (SPA) ====
function cambiarVista(vistaId, elementoEnlace) {
    const todasLasVistas = document.querySelectorAll('.vista-seccion');
    todasLasVistas.forEach(vista => {
        vista.classList.remove('activa');
    });

    document.getElementById(vistaId).classList.add('activa');

    const todosLosEnlaces = document.querySelectorAll('.nav-link');
    todosLosEnlaces.forEach(enlace => {
        enlace.classList.remove('active');
    });

    if (elementoEnlace) {
        elementoEnlace.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==== CONTROL DEL MODAL ====
function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('infoModal').style.display = 'flex'; 
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('infoModal')) {
        closeModal();
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderMenu(productos);
    inicializarCarruselVideos();
});