let operacionMarcada = false;
let operacionFinalizada = false;

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

// buttons
zero.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "0";
  } else {
    clearAll();
    write.innerHTML += "0";
    operacionFinalizada = false;
  }
});

one.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "1";
  } else {
    clearAll();
    write.innerHTML += "1";
    operacionFinalizada = false;
  }
});

two.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "2";
  } else {
    clearAll();
    write.innerHTML += "2";
    operacionFinalizada = false;
  }
});

three.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "3";
  } else {
    clearAll();
    write.innerHTML += "3";
    operacionFinalizada = false;
  }
});

four.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "4";
  } else {
    clearAll();
    write.innerHTML += "4";
    operacionFinalizada = false;
  }
});

five.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "5";
  } else {
    clearAll();
    write.innerHTML += "5";
    operacionFinalizada = false;
  }
});

six.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "6";
  } else {
    clearAll();
    write.innerHTML += "6";
    operacionFinalizada = false;
  }
});

seven.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "7";
  } else {
    clearAll();
    write.innerHTML += "7";
    operacionFinalizada = false;
  }
});

eight.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "8";
  } else {
    clearAll();
    write.innerHTML += "8";
    operacionFinalizada = false;
  }
});

nine.addEventListener("click", () => {
  if (!operacionFinalizada) {
    write.innerHTML += "9";
  } else {
    clearAll();
    write.innerHTML += "9";
    operacionFinalizada = false;
  }
});

// para que solo se pueda poner 1 punto
let dotter = true;
dot.addEventListener("click", () => {
  if (operacionFinalizada) {
    clearAll();
    operacionFinalizada = false;
  }

  if (dotter) {
    dotter = false;
    if (write.innerHTML.length == 0) {
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

// operandos
plus.addEventListener("click", () => {
  if (!operacionMarcada) {
    write.innerHTML += "+";
    operacionMarcada = true;
  }
});

minus.addEventListener("click", () => {
  if (!operacionMarcada) {
    write.innerHTML += "-";
    operacionMarcada = true;
  }
});

mult.addEventListener("click", () => {
  if (!operacionMarcada) {
    write.innerHTML += "*";
    operacionMarcada = true;
  }
});

divide.addEventListener("click", () => {
  if (!operacionMarcada) {
    write.innerHTML += "/";
    operacionMarcada = true;
  }
});

module.addEventListener("click", () => {
  masiva("%");
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
    write.innerHTML = Math.round(eval(resultado) * 100) / 100;
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
 * testeo, si funciona, pereza cambiarlo
 * @param {*} operando
 */
function masiva(operando) {
  if (!operacionMarcada) {
    write.innerHTML += `${operando}`;
    operacionMarcada = true;
  }
}
