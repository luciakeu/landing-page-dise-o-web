// Scroll animado y lento hacia cada sección (menú, logo y flecha)
const menuToggle = document.querySelector("#menu-toggle"); // el checkbox que abre y cierra el menú
const linksInternos = document.querySelectorAll('a[href^="#"]'); // todos los links que apuntan a una sección
const duracionScroll = 1750; // duración en milisegundos: subilo para que baje más lento

// Curva de velocidad: arranca suave, acelera en el medio y frena suave al llegar
function suavizado(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollAnimado(destinoY) {
    const inicioY = window.scrollY; // dónde está la página ahora
    const distancia = destinoY - inicioY; // cuánto hay que moverse
    const inicioTiempo = performance.now(); // momento en que arranca la animación

    function paso(ahora) {
        const progreso = Math.min((ahora - inicioTiempo) / duracionScroll, 1); // de 0 a 1
        window.scrollTo(0, inicioY + distancia * suavizado(progreso));
        if (progreso < 1) {
            requestAnimationFrame(paso); // pide el siguiente cuadro hasta terminar
        }
    }

    requestAnimationFrame(paso);
}

linksInternos.forEach((link) => {
    link.addEventListener("click", (evento) => {
        const destino = document.querySelector(link.getAttribute("href")); // la sección a la que apunta
        if (!destino) return; // si no existe, deja que el link funcione normal

        evento.preventDefault(); // evita el salto y que aparezca el # en la URL
        menuToggle.checked = false; // cierra el menú del celular

        const alturaHeader = document.querySelector("header").offsetHeight; // para que el header no tape el título
        const scrollMaximo = document.documentElement.scrollHeight - window.innerHeight; // lo más abajo que puede llegar la página
        const destinoY = Math.min(destino.getBoundingClientRect().top + window.scrollY - alturaHeader, scrollMaximo); // nunca más allá del final

        // Si la persona pidió menos animaciones en su sistema, salta directo
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.scrollTo(0, destinoY);
        } else {
            scrollAnimado(destinoY);
        }
    });
});

// Fondo al header cuando la página no está arriba de todo
const header = document.querySelector("header");

function actualizarHeader() {
    header.classList.toggle("header-con-fondo", window.scrollY > 50); // agrega la clase si bajaste más de 50px, la quita si no
}

window.addEventListener("scroll", actualizarHeader); // se revisa cada vez que se scrollea
actualizarHeader(); // y una vez al cargar, por si la página abre ya scrolleada