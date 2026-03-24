// --- Variables con let (pueden cambiar) ---
console.log('¡Hola desde JavaScript!');

let nombre = 'Angel';
let edad = 21;
let estaAprendiendo = true;

// --- Imprime cada variable ---
console.log(nombre);
console.log(edad);
console.log(estaAprendiendo);

// --- Verifica los tipos de datos ---
console.log(typeof nombre);
console.log(typeof edad);
console.log(typeof estaAprendiendo);

// --- Variables con const (no pueden cambiar) ---
const curso = 'code 101';
const maxIntentos = 10;

console.log(curso);
console.log(maxIntentos);

// --- Entrada del usuario ---
 let nombreUsuario = prompt ('Cómo te llamas?');
 let edadUsuario = prompt ('Cual es tu edad?');

 console.log(nombreUsuario);
 console.log(edadUsuario);

alert('Hola ' + nombreUsuario + ', tienes ' + edadUsuario + ' años.')

// --- Verifica en consola ---
console.log('Nombre:', nombreUsuario);

console.log(typeof nombreUsuario);
console.log(typeof edadUsuario);


// --- Operadores aritméticos ---
let a = 20;
let b = 7;

console.log('Suma:', a + b);
console.log('Resta:', a - b);
console.log('Multiplicación:', a * b);
console.log('División:', a / b);
console.log('Módulo:', a % b);

// --- ¿Qué resultado esperas? ---
console.log('5' + 3);
console.log(5 + 3);
console.log('5' - 3);

// Forma 1: Concatenación con +
let saludo1 = 'Hola ' + nombreUsuario + ', tienes ' + edadUsuario + ' años.';
console.log(saludo1);

let saludo2 = `Hola  ${nombreUsuario}, tienes ${edadUsuario} años.`;
console.log(saludo2);

// --- Calculadora de edad ---
let anioActual = 2026;
let anioNacimiento = anioActual - Number(edadUsuario);

let saludo3 = `Hola  ${nombreUsuario}, naciste aproximadamente en el año ${anioNacimiento}.`;
console.log(saludo3);