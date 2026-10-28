// Cierra el menú del celular al tocar un link
const menuToggle = document.querySelector("#menu-toggle"); // el checkbox que abre y cierra el menú
const linksMenu = document.querySelectorAll(".navlist a"); // todos los links del menú

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.checked = false; // desmarca el checkbox: el menú se cierra
    });
});


// Fondo al header cuando la página no está arriba de todo
const header = document.querySelector("header");

function actualizarHeader() {
    header.classList.toggle("header-con-fondo", window.scrollY > 50); // agrega la clase si bajaste más de 50px, la quita si no
}

window.addEventListener("scroll", actualizarHeader); // se revisa cada vez que se scrollea
actualizarHeader(); // y una vez al cargar, por si la página abre ya scrolleada