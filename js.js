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

// para que solo se pueda poner 1 punto en cada número
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

  // si el número actual no tiene punto, se añade
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

  // solamente deja escribir números negativos al principio,
  // o después de un operador
  if (res === "" || ult === "+" || ult === "*" || ult === "/") {
    write.innerHTML += "-";
  }
});

borrar.addEventListener("click", () => {
  const res = write.innerHTML;

  // comprueba si se ha borrado un operador, si lo ha borrado,
  // marca el booleano como false para poder volver a marcarlo.
  for (let i = 0; i < res.length; i++) {
    if ("/*+-".includes(res[i])) {
      operacionMarcada = false;
    }
  }

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
  if (operacionFinalizada) {
    clearAll();
    operacionFinalizada = false;
  }

  const texto = write.innerHTML;
  const ultimoChar = texto[texto.length - 1];

  if (!isNaN(parseInt(ultimoChar))) {
    console.log("");
    write.innerHTML += "%";
  }
});

// function result() {
//   let expr = write.innerHTML;
//   operation.innerHTML = expr;

//   if (expr.includes("/0")) {
//     write.innerHTML = "bro...";
//     operacionMarcada = false;
//     operacionFinalizada = true;
//     return;
//   }

//   if (expr == "") {
//     write.innerHTML = "";
//   } else {
//     // Si termina en %: buscar operador antes del porcentaje
//     if (expr.endsWith("%")) {
//       let sinPorcentaje = expr.slice(0, -1); // quita el %
//       let operadores = ["+", "-", "*", "/"];
//       let operadorIndex = -1;

//       // busca el último operador (de derecha a izquierda)
//       for (let i = sinPorcentaje.length - 1; i >= 0; i--) {
//         if (operadores.includes(sinPorcentaje[i])) {
//           operadorIndex = i;
//         }
//       }

//       if (operadorIndex !== -1) {
//         let num1 = parseFloat(sinPorcentaje.slice(0, operadorIndex));
//         let operador = sinPorcentaje[operadorIndex];
//         let num2 = parseFloat(sinPorcentaje.slice(operadorIndex + 1));

//         let resultado = 0;

//         switch (operador) {
//           case "+":
//             resultado = num1 + (num1 * num2) / 100;
//             break;
//           case "-":
//             resultado = num1 - (num1 * num2) / 100;
//             break;
//           case "*":
//             resultado = num1 * (num2 / 100);
//             break;
//           case "/":
//             resultado = num1 / (num2 / 100);
//             break;
//         }

//         resultado = Math.round(resultado * 100) / 100;
//         write.innerHTML = resultado;
//         ultimoResultado = resultado;
//         operacionMarcada = false;
//         operacionFinalizada = true;
//         return;
//       }
//     }

//     // Si no hay porcentaje, evalúa normalmente
//     try {
//       let res = Math.round(eval(expr) * 100) / 100;
//       write.innerHTML = res;
//       ultimoResultado = res;
//       operacionMarcada = false;
//       operacionFinalizada = true;
//     } catch (err) {
//       write.innerHTML = "0";
//       operacionFinalizada = true;
//     }
//   }
// }

function result() {
  let expr = write.innerHTML;
  operation.innerHTML = expr;

  if (expr.includes("/0")) {
    write.innerHTML = "bro...";
    operacionMarcada = false;
    operacionFinalizada = true;
    return;
  }

  if (expr == "") {
    write.innerHTML = "";
  } else {
    const operadores = ["+", "-", "*", "/"];
    let operadorIndex = -1;

    // Buscar operador (solo el primero que encuentre de izquierda a derecha)
    for (let i = 0; i < expr.length; i++) {
      if (operadores.includes(expr[i])) {
        operadorIndex = i;
        break;
      }
    }

    if (operadorIndex === -1) {
      // No hay operador, evalúa normalmente
      try {
        let res = Math.round(eval(expr) * 100) / 100;
        write.innerHTML = res;
      } catch {
        write.innerHTML = "0";
      }
      operacionFinalizada = true;
      return;
    }

    // Extraer operandos
    let leftPart = expr.slice(0, operadorIndex).trim();
    let rightPart = expr.slice(operadorIndex + 1).trim();
    let operador = expr[operadorIndex];

    // Detectar si operandos tienen %
    let leftIsPercent = leftPart.endsWith("%");
    let rightIsPercent = rightPart.endsWith("%");

    // Convertir operandos a números (quitando % si hay)
    let num1 = leftIsPercent ? parseFloat(leftPart.slice(0, -1)) : parseFloat(leftPart);
    let num2 = rightIsPercent ? parseFloat(rightPart.slice(0, -1)) : parseFloat(rightPart);

    let resultado = 0;

    if (leftIsPercent && rightIsPercent) {
      // Ambos porcentajes, depende de la operación
      switch (operador) {
        case "+":
          resultado = num1 / 100 + num2 / 100;
          break;
        case "-":
          resultado = num1 / 100 - num2 / 100;
          break;
        case "*":
          resultado = (num1 / 100) * (num2 / 100);
          break;
        case "/":
          resultado = num1 / 100 / (num2 / 100);
          break;
      }
      resultado = resultado * 100; // lo pasamos a porcentaje
    } else if (rightIsPercent) {
      // Solo el segundo es porcentaje
      switch (operador) {
        case "+":
          resultado = num1 + (num1 * num2) / 100;
          break;
        case "-":
          resultado = num1 - (num1 * num2) / 100;
          break;
        case "*":
          resultado = num1 * (num2 / 100);
          break;
        case "/":
          resultado = num1 / (num2 / 100);
          break;
      }
    } else if (leftIsPercent) {
      // Solo el primero es porcentaje
      switch (operador) {
        case "+":
          resultado = num1 / 100 + num2;
          break;
        case "-":
          resultado = num1 / 100 - num2;
          break;
        case "*":
          resultado = (num1 / 100) * num2;
          break;
        case "/":
          resultado = num1 / 100 / num2;
          break;
      }
    } else {
      // Ninguno es porcentaje, evalúa normal
      try {
        resultado = eval(expr);
      } catch {
        write.innerHTML = "0";
        operacionFinalizada = true;
        return;
      }
    }

    resultado = Math.round(resultado * 100) / 100;
    write.innerHTML = resultado;
    ultimoResultado = resultado;
    operacionMarcada = false;
    operacionFinalizada = true;
  }
}

/**
 * realiza la limpieza de la ventana
 */
function clearAll() {
  write.innerHTML = "";
  operation.innerHTML = "";
  operacionMarcada = false;
  operacionFinalizada = true;
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

/**
 * añade un operador, sólo si no hay ninguno añadido anteriormente
 * @param {*} operador
 */
function introducirOperador(operador) {
  if (write.innerHTML != "" && write.innerHTML != "bro...") {
    if (operacionFinalizada) {
      operacionFinalizada = false;
      write.innerHTML += `${operador}`;
      operacionMarcada = true;
    } else if (!operacionMarcada) {
      write.innerHTML += `${operador}`;
      operacionMarcada = true;
    }
  }
}
