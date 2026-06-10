// ===============================
// ICONOS PERSONALIZADOS
// ===============================
const iconoNegocio = L.icon({
  iconUrl: "../assets/images/leaf-green.png",
  shadowUrl: "../assets/images/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const iconoCliente = L.icon({
  iconUrl: "../assets/images/leaf-red.png",
  shadowUrl: "../assets/images/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

// ===============================
// COORDENADAS DEL NEGOCIO
// ===============================
const negocio = [39.466217, -0.382086];

// ===============================
// MAPA
// ===============================
const map = L.map("map").setView(negocio, 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 14,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Marcador del negocio
L.marker(negocio, { icon: iconoNegocio })
  .addTo(map)
  .bindPopup(
    "<strong>Mundo Digital</strong><br>Avenida Innovación 45<br>Valencia",
  )
  .openPopup();

// ===============================
// GEOLOCALIZACIÓN DEL CLIENTE
// ===============================
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const cliente = [pos.coords.latitude, pos.coords.longitude];

      // Marcador del cliente
      L.marker(cliente, { icon: iconoCliente })
        .addTo(map)
        .bindPopup("Tu ubicación");

      // ===============================
      // RUTA OSRM
      // ===============================
      const url = `https://router.project-osrm.org/route/v1/driving/${cliente[1]},${cliente[0]};${negocio[1]},${negocio[0]}?overview=full&geometries=geojson`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.routes || !data.routes.length) {
            alertaNeon("No se pudo calcular la ruta", "error");
            return;
          }

          const coords = data.routes[0].geometry.coordinates;
          const latlngs = coords.map((c) => [c[1], c[0]]);

          // Línea animada
          const polyline = L.polyline(latlngs, {
            color: "#38bdf8",
            weight: 5,
            opacity: 0.9,
          }).addTo(map);

          // Ajustar mapa a ambos puntos
          map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
        })
        .catch(() =>
          alertaNeon("Error al conectar con el servidor de rutas", "error"),
        );
    },
    () => alertaNeon("No se pudo obtener tu ubicación", "error"),
  );
} else {
  alertaNeon("Tu navegador no soporta geolocalización", "error");
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
