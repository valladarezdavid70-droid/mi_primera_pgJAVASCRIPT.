// ===============================
// SISTEMA DE NOTICIAS FUTURISTA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-cargar-noticias")
    .addEventListener("click", cargarNoticias);

  document.getElementById("btn-volver").addEventListener("click", volverALista);
});

let noticiasGlobal = [];

// ===============================
// CARGAR NOTICIAS
// ===============================
function cargarNoticias() {
  const mensaje = document.getElementById("noticias-mensaje");
  mensaje.textContent = "Cargando noticias...";
  mensaje.style.color = "";

  fetch("../DATA/noticias.json")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        mensaje.textContent = "No hay noticias disponibles.";
        mensaje.style.color = "orange";
        return;
      }

      noticiasGlobal = data;
      mostrarLista(data);
      mensaje.textContent = "";
    })
    .catch(() => {
      mensaje.textContent = "Error cargando noticias.";
      mensaje.style.color = "red";
    });
}

// ===============================
// MOSTRAR LISTA
// ===============================
function mostrarLista(noticias) {
  const lista = document.getElementById("contenedor-noticias");
  const detalle = document.getElementById("detalle-noticia");

  lista.innerHTML = "";
  lista.classList.remove("oculto");
  detalle.classList.add("oculto");

  noticias.forEach((noticia, i) => {
    const card = document.createElement("article");
    card.classList.add("noticia-card");

    // Animación escalonada
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p class="meta">${noticia.fecha} · ${noticia.categoria}</p>
      <p>${noticia.resumen}</p>
    `;

    card.addEventListener("click", () => mostrarDetalle(noticia.id));

    lista.appendChild(card);
  });
}

// ===============================
// MOSTRAR DETALLE
// ===============================
function mostrarDetalle(id) {
  const noticia = noticiasGlobal.find((n) => n.id === id);

  if (!noticia) {
    alertaNeon("La noticia no existe", "error");
    return;
  }

  const lista = document.getElementById("contenedor-noticias");
  const detalle = document.getElementById("detalle-noticia");
  const contenido = document.getElementById("detalle-contenido");

  lista.classList.add("oculto");
  detalle.classList.remove("oculto");

  contenido.innerHTML = `
    <img src="${noticia.imagen}" alt="${noticia.titulo}">
    <h2>${noticia.titulo}</h2>
    <p class="meta">${noticia.fecha} · ${noticia.categoria}</p>
    <p>${noticia.contenido}</p>
  `;
}

// ===============================
// VOLVER A LISTA
// ===============================
function volverALista() {
  mostrarLista(noticiasGlobal);
}

// ===============================
// ALERTA NEÓN FUTURISTA
// ===============================
function alertaNeon(texto, tipo = "ok") {
  const alerta = document.createElement("div");
  alerta.className = "alerta-neon " + tipo;
  alerta.textContent = texto;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.style.opacity = "0";
    alerta.style.transform = "translateY(-20px)";
  }, 2000);

  setTimeout(() => alerta.remove(), 2600);
}
