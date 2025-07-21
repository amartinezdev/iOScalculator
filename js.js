let operacionMarcada = false;
let operacionFinalizada = false;
let ultimoResultado = "";
let dotter = true;

const clear = document.querySelector("#clear");
const borrar = document.querySelector("#delete");
const module = document.querySelector("#module");
const divide = document.querySelector("#divide");

const seven = document.querySelector("#digit7");
const eight = document.querySelector("#digit8");
const nine = document.querySelector("#digit9");
const mult = document.querySelector("#mult");

const four = document.querySelector("#digit4");
const five = document.querySelector("#digit5");
const six = document.querySelector("#digit6");
const plus = document.querySelector("#plus");

const one = document.querySelector("#digit1");
const two = document.querySelector("#digit2");
const three = document.querySelector("#digit3");
const minus = document.querySelector("#minus");

const negative = document.querySelector("#negative");
const zero = document.querySelector("#digit0");
const dot = document.querySelector("#digitDOT");
const equal = document.querySelector("#equals");

const write = document.querySelector(".write");
const operation = document.querySelector(".operation");

// operandos
zero.addEventListener("click", () => {
  introducirOperando("0");
});

one.addEventListener("click", () => {
  introducirOperando("1");
});

two.addEventListener("click", () => {
  introducirOperando("2");
});

three.addEventListener("click", () => {
  introducirOperando("3");
});

four.addEventListener("click", () => {
  introducirOperando("4");
});

five.addEventListener("click", () => {
  introducirOperando("5");
});

six.addEventListener("click", () => {
  introducirOperando("6");
});

seven.addEventListener("click", () => {
  introducirOperando("7");
});

eight.addEventListener("click", () => {
  introducirOperando("8");
});

nine.addEventListener("click", () => {
  introducirOperando("9");
});

// para que solo se pueda poner 1 punto
dot.addEventListener("click", () => {
  if (operacionFinalizada) {
    clearAll();
    operacionFinalizada = false;
  }

  const res = write.innerHTML;
  let numeroActual = "";
  let encontrado = false;

  // recorre hacia atrás hasta encontrar un operador
  // si lo encuentra, el bucle se para y comprueba si hay ya un punto o no.
  for (let i = res.length - 1; i >= 0 && !encontrado; i--) {
    const char = res[i];
    if ("+-*/%".includes(char)) {
      encontrado = true;
    }
    numeroActual = char + numeroActual;
  }

  // Si el número actual no tiene punto, se añade
  if (!numeroActual.includes(".")) {
    if (numeroActual === "") {
      write.innerHTML += "0.";
    } else {
      write.innerHTML += ".";
    }
  }
});

negative.addEventListener("click", () => {
  if (operacionFinalizada) {
    clearAll();
    operacionFinalizada = false;
  }

  const res = document.querySelector(".write").innerHTML;
  const ult = res.charAt(res.length - 1);

  if (res === "" || ult === "+" || ult === "*" || ult === "/") {
    write.innerHTML += "-";
  }
});

borrar.addEventListener("click", () => {
  write.innerHTML = write.innerHTML.slice(0, -1);
});

// operadores
plus.addEventListener("click", () => {
  introducirOperador("+");
});

minus.addEventListener("click", () => {
  introducirOperador("-");
});

mult.addEventListener("click", () => {
  introducirOperador("*");
});

divide.addEventListener("click", () => {
  introducirOperador("/");
});

module.addEventListener("click", () => {
  introducirOperador("%");
});

// operación
function result() {
  const resultado = document.querySelector(".write").innerHTML;
  operation.innerHTML = resultado;

  if (resultado.includes("/0")) {
    write.innerHTML = "bro...";
    operation.innerHTML = resultado;
    operacionMarcada = false;
    operacionFinalizada = true;
    dotter = true;
  } else if (resultado == "") {
    resultado = "";
  } else {
    const res = Math.round(eval(resultado) * 100) / 100;
    write.innerHTML = res;
    ultimoResultado = res;
    operacionMarcada = false;
    operacionFinalizada = true;
    dotter = true;
  }
}

function clearAll() {
  write.innerHTML = "";
  operation.innerHTML = "";
}

/**
 * introduce operando en la calculadora
 * @param {*} operando
 */
function introducirOperando(operando) {
  if (operacionFinalizada) {
    clearAll();
    write.innerHTML += operando;
    operacionFinalizada = false;
  } else {
    write.innerHTML += operando;
  }
}

function introducirOperador(operador) {
  if (operacionFinalizada) {
    operacionFinalizada = false;
    write.innerHTML += `${operador}`;
    operacionMarcada = true;
  } else if (!operacionMarcada) {
    write.innerHTML += `${operador}`;
    operacionMarcada = true;
  }
}
