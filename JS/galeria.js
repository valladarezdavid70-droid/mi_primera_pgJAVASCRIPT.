// Lista de imágenes dinámicas
const imagenes = [
    "../assets/images/imagen1.png",
    "../assets/images/imagen2.png",
    "../assets/images/imagen3.png",
    "../assets/images/imagen4.png",
    "../assets/images/imagen5.png",
    "../assets/images/imagen6.png",
    "../assets/images/imagen11.png",
    "../assets/images/imagen12.png",
    "../assets/images/imagen13.png",
    "../assets/images/imagen14.png"     
];

// Contenedor de la galería
const contenedor = document.getElementById("contenedor-galeria");



// Crear imágenes dinámicas compatibles con GLightbox
imagenes.forEach(src => {
    const a = document.createElement("a");
    a.href = src;
    a.classList.add("glightbox");
    a.setAttribute("data-gallery", "galeria");

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Imagen de galería";
    img.loading = "lazy";
    img.classList.add("img-thumb");

    a.appendChild(img);
    contenedor.appendChild(a);
});

// Inicializar GLightbox
GLightbox({
    selector: ".glightbox"
});




