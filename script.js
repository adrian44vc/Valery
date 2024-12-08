"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const extendedApologySection = document.querySelector(".extended-apology");
const finalMessageSection = document.querySelector(".final-message");

// Nuevo contenedor de mensajes dinámicos
const messageArea = document.querySelector(".message-area");

const MAX_IMAGES = 10; // Máximo de imágenes distintas para "No"

let play = true;
let noCount = 0;

// Mensajes iniciales: Estos se mostrarán en orden cada vez que se presione "No"
const initialMessages = [
  "¿Segura que no?",
  "Por favor, reconsidera...",
  "Te prometo que será diferente esta vez.",
  "No lo tomes tan en serio, ¿sí?",
  "Lo siento mucho si preocuparte fue algo muy malo.",
  "Perdóname, no era mi intención...",
  "De verdad, no quería que te sintieras así...",
  "Podemos resolverlo, no crees? qwq",
  "Lo siento, en serio.",
  "Solo quiero que no estes molesta conmigo qwq.",
];

// Mensajes extra (se eligen aleatoriamente cuando se acaben los iniciales)
const extraMessages = [
  "No volverá a pasar, lo prometo.",
  "Quiero que las cosas sean mejores entre nosotros.",
  "Espero que podamos resolver esto.",
  "Te valoro mucho, en serio.",
  "No quiero que esto nos afecte.",
  "Dame otra oportunidad para arreglarlo.",
  "Espero que podamos reírnos de esto después.",
  "Estoy haciendo mi mejor esfuerzo qwq",
  "Sé que no soy perfecto, pero quiero mejorar.",
  "Tu amistad significa todo para mí actualmente.",
  "Por favor, dame un poco de paciencia.",
  "Me siento terrible por esto.",
  "Lo digo en serio, estoy aprendiendo.",
  "Quiero hacer las cosas bien esta vez.",
  "Sé que es raro, pero de verdad lo siento.",
  "Ojalá podamos olvidarlo...",
  "No sé cómo más disculparme.",
  "Espero que podamos dejar esto atrás.",
  "De verdad, no quiero que te sientas así.",
  "Gracias por tu paciencia, de verdad.",
];


// Escuchadores de eventos
yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);
catImg.addEventListener("dblclick", showFinalMessage);

// Funciones
function handleYesClick() {
  titleElement.innerHTML = "SIIIIIIIIIIIIIIIIIIIII! 💞♥️♥️♥️♥️♥️♥️♥️♥️";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  window.navigator.vibrate(200); // Vibración leve

  // Mostramos el mensaje final con una pequeña demora
  setTimeout(() => {
    showFinalMessage();
    smoothScrollTo(finalMessageSection);
  }, 1000);
}

function handleNoClick() {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    resizeNoButton();
    updateMessageArea(noCount);

    if (noCount === 3) {
      // A la tercera negación mostramos la sección extendida
      showExtendedApology();
    }
    if (noCount === MAX_IMAGES) {
      // Llegamos al máximo de imágenes
      play = false;
    }
  } else {
    // Después de alcanzar el máximo de imágenes, seguimos mostrando mensajes aleatorios
    noCount++;
    updateMessageArea(noCount);
    // Si quieres ocultar el botón "No" después de muchos intentos, puedes hacerlo aquí:
    if (noCount === MAX_IMAGES + 20) {
      noButton.style.display = "none";
    }
  }
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.05;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function resizeNoButton() {
  const computedStyle = window.getComputedStyle(noButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  noButton.style.fontSize = `${fontSize * 0.95}px`;
}

function updateMessageArea(count) {
  let message = "";
  if (count <= initialMessages.length) {
    // Usamos los mensajes iniciales en orden
    message = initialMessages[count - 1]; 
  } else {
    // Mensajes extra aleatorios
    const randIndex = Math.floor(Math.random() * extraMessages.length);
    message = extraMessages[randIndex];
  }

  // Mostramos el mensaje en el área, con un pequeño efecto
  messageArea.classList.remove("hide");
  messageArea.classList.add("show");
  messageArea.innerHTML = message;
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function showExtendedApology() {
  extendedApologySection.classList.remove("hidden");
  setTimeout(() => {
    extendedApologySection.classList.add("show");
    smoothScrollTo(extendedApologySection);
  }, 100);
}

function showFinalMessage() {
  finalMessageSection.classList.remove("hidden");
  setTimeout(() => {
    finalMessageSection.classList.add("show");
    smoothScrollTo(finalMessageSection);
  }, 100);
}

function smoothScrollTo(element) {
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
