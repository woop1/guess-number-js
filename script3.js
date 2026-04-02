// === ADIVINA EL NÚMERO - Versión DOM ===

// --- Seleccionar elementos del HTML ---
const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');
const maxIntentos = 10; // límite de intentos

console.log('Elementos conectados:', inputIntento, btnAdivinar, mensaje);

// --- Variables del juego ---
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];


console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Tu primera función ---
function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

// Prueba inicial
mostrarMensaje('¡Bienvenido al juego!', '#e94560');

// --- Pista de cercanía ---
function obtenerPista(intento, secreto) {
  let diferencia = Math.abs(intento - secreto);

  if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
  } else if (diferencia <= 15) {
    return '♨️ Caliente';
  } else if (diferencia <= 30) {
    return '🌤️ Tibio';
  } else {
    return '❄️ Frío';
  }
}

// --- Función principal ---
function verificarIntento() {
  let valor = Number(inputIntento.value);

  // Validar entrada
  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Ingresa un número del 1 al 100', 'orange');
    return;
  }

  // Incrementar contador
  intentos++;
  contador.textContent = 'Intentos: ' + intentos;

  // Agregar al historial
  let color = valor > numeroSecreto 
    ? '#ff6b6b' 
    : valor < numeroSecreto 
    ? '#4ecdc4' 
    : '#00ff88';

  historial.innerHTML += 
    '<span class="guess-pill" style="background:' + color + '30; color:' + color + '">' 
    + valor + 
    '</span>';

  // 🔥 AQUÍ VA LA LÓGICA CON EFECTOS
  if (valor === numeroSecreto) {
    mostrarMensaje('🎉 ¡Correcto! Era el ' + numeroSecreto, '#00ff88');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';

    tarjeta.style.borderColor = '#00ff88';
    tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.5)';

    lanzarEmojis('fiesta');

  } else if (valor > numeroSecreto) {
    let pista = obtenerPista(valor, numeroSecreto);

    if (pista.includes('Frío')) {
      sacudirTarjeta('#4ecdc4');
      lanzarEmojis('frio');
    } else {
      sacudirTarjeta('#ff6b6b');
      lanzarEmojis('caliente');
    }

    mostrarMensaje('📈 Muy alto. ' + pista, '#ff6b6b');

  } else {
    let pista = obtenerPista(valor, numeroSecreto);

    if (pista.includes('Frío')) {
      sacudirTarjeta('#4ecdc4');
      lanzarEmojis('frio');
    } else {
      sacudirTarjeta('#ff6b6b');
      lanzarEmojis('caliente');
    }

    mostrarMensaje('📉 Muy bajo. ' + pista, '#4ecdc4');
  }
if (intentos >= maxIntentos && valor !== numeroSecreto) {
  mostrarMensaje('💀 ¡Perdiste! Era el ' + numeroSecreto, 'red');
  btnAdivinar.disabled = true;
  btnReiniciar.style.display = 'inline-block';

}

  // Limpiar input
  inputIntento.value = '';
  inputIntento.focus();
}

// --- Conectar eventos ---
btnAdivinar.addEventListener('click', verificarIntento);

inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});

// --- Reiniciar juego ---
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = 'Intentos: 0';
  historial.innerHTML = '';
  mostrarMensaje('🎯 ¡Nuevo juego! Adivina el número...', '#e94560');

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = 'none';

  inputIntento.value = '';
  inputIntento.focus();

  tarjeta.style.borderColor = 'rgba(233, 69, 96, 0.3)';
  tarjeta.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
}

btnReiniciar.addEventListener('click', reiniciarJuego);

// === EFECTOS VISUALES EN LA TARJETA ===

// Sacudir una tarjeta con color y sombra
function sacudirTarjeta(color) {
  tarjeta.style.borderColor = color;
  tarjeta.style.boxShadow = `0 0 25px ${color}`;

  tarjeta.animate([
    { transform: 'translateX(0px)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0px)' }
  ], { duration: 300 });
}

// Lanzar emojis alrededor de la tarjeta
function lanzarEmojis(tipo) {
  const emoji = tipo === 'frio' ? '❄️' :
                tipo === 'caliente' ? '🔥' :
                tipo === 'fiesta' ? '🎉' : '✨';

  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.textContent = emoji;

    // Posición inicial en el centro
    span.style.position = 'fixed';
    span.style.left = '50%';
    span.style.top = '50%';
    span.style.fontSize = '50px';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '-1';

    document.body.appendChild(span);

    // Movimiento aleatorio alrededor del centro
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;

    span.animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
    ], { duration: 1000, easing: 'ease-out' });

    setTimeout(() => span.remove(), 1000);
  }
}