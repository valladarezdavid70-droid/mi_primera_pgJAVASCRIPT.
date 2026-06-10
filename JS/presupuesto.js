// ===============================
// VALIDACIÓN + CÁLCULO DE PRESUPUESTO (VERSIÓN PREMIUM)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPresupuesto");
  const mensaje = document.getElementById("mensaje");

  // Campos de contacto
  const campos = {
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    provincia: document.getElementById("provincia"),
  };

  // Campos de presupuesto
  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const extras = document.querySelectorAll(".extra");
  const total = document.getElementById("total");
  const condiciones = document.getElementById("condiciones");

  // Expresiones regulares
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
  const soloNumeros = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Crear mensajes de error debajo de cada campo
  Object.values(campos).forEach((campo) => {
    const error = document.createElement("div");
    error.classList.add("error-msg");
    campo.insertAdjacentElement("afterend", error);
  });

  // ===============================
  // VALIDACIÓN INDIVIDUAL
  // ===============================
  function validarCampo(id) {
    const campo = campos[id];
    const errorMsg = campo.nextElementSibling;

    let valido = true;
    let mensaje = "";

    switch (id) {
      case "nombre":
        if (!soloLetras.test(campo.value) || campo.value.length > 15) {
          valido = false;
          mensaje = "Máx. 15 letras.";
        }
        break;

      case "apellido":
        if (!soloLetras.test(campo.value) || campo.value.length > 20) {
          valido = false;
          mensaje = "Máx. 20 letras.";
        }
        break;

      case "email":
        if (!emailValido.test(campo.value)) {
          valido = false;
          mensaje = "Email no válido.";
        }
        break;

      case "telefono":
        if (!soloNumeros.test(campo.value) || campo.value.length !== 9) {
          valido = false;
          mensaje = "Debe tener 9 números.";
        }
        break;

      case "provincia":
        if (campo.value === "") {
          valido = false;
          mensaje = "Seleccione una provincia.";
        }
        break;
    }

    if (!valido) {
      campo.classList.add("error");
      campo.classList.remove("ok");
      errorMsg.textContent = mensaje;
    } else {
      campo.classList.remove("error");
      campo.classList.add("ok");
      errorMsg.textContent = "";
    }

    return valido;
  }

  // Validación en tiempo real
  Object.keys(campos).forEach((id) => {
    campos[id].addEventListener("input", () => {
      validarCampo(id);
      mensaje.textContent = ""; // Limpia mensaje general
    });
  });

  // ===============================
  // CÁLCULO AUTOMÁTICO DEL PRESUPUESTO
  // ===============================
  function calcularPresupuesto() {
    let precioBase = parseFloat(producto.value) || 0;

    // Sumar extras seleccionados
    extras.forEach((extra) => {
      if (extra.checked) precioBase += parseFloat(extra.value);
    });

    // Descuento por meses
    let meses = parseInt(plazo.value);
    let descuento = 0;

    if (meses >= 4 && meses <= 6) descuento = 0.05;
    else if (meses >= 7 && meses <= 12) descuento = 0.1;
    else if (meses > 12) descuento = 0.15;

    let precioFinal = precioBase - precioBase * descuento;

    // Animación del total
    total.classList.add("update");
    setTimeout(() => total.classList.remove("update"), 400);

    total.value = precioFinal.toFixed(2) + "€";
  }

  // Eventos que recalculan automáticamente
  producto.addEventListener("change", calcularPresupuesto);
  plazo.addEventListener("input", calcularPresupuesto);
  extras.forEach((extra) =>
    extra.addEventListener("change", calcularPresupuesto),
  );

  // ===============================
  // VALIDACIÓN FINAL DEL FORMULARIO
  // ===============================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let todoCorrecto = true;

    // Validar todos los campos
    Object.keys(campos).forEach((id) => {
      if (!validarCampo(id)) todoCorrecto = false;
    });

    // Validar producto
    if (producto.value === "") {
      mensaje.textContent = "Seleccione un producto.";
      mensaje.style.color = "red";
      return;
    }

    // Validar condiciones
    if (!condiciones.checked) {
      mensaje.textContent = "Debe aceptar las condiciones.";
      mensaje.style.color = "red";
      return;
    }

    if (!todoCorrecto) {
      mensaje.textContent = "Revise los campos marcados en rojo.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "Formulario enviado correctamente.";
    mensaje.style.color = "green";
  });
});
