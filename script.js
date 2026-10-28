// Cierra el menú del celular al tocar un link
const menuToggle = document.querySelector("#menu-toggle"); // el checkbox que abre y cierra el menú
const linksMenu = document.querySelectorAll(".navlist a"); // todos los links del menú

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.checked = false; // desmarca el checkbox: el menú se cierra
    });
});