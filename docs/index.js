/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá
  const newStr = str.split('').reverse().join('');
  return newStr;
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  const newStr = str.split('').reverse().join('');
  if (newStr === str) {
    return true;
  } else {
    return false;
  }
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  // validation
  if (arr.length < 2) {
    return false;
  }

  // sorting
  const sortedArr = arr.sort((a, b) => a - b);
  let minDiff = Infinity; // valor numerico infinito
  let minPair = [sortedArr[0], sortedArr[1]];

  for (let i = 0; i < sortedArr.length - 1; i++) {
    const difference = sortedArr[i + 1] - sortedArr[i];
    // console.log(difference);
    if (difference < minDiff) {
      minDiff = difference;
      minPair = [sortedArr[i], sortedArr[i + 1]];
    }
  }

  return minPair;
}

// console.log(closestPair([4, 2, 1, 7, 9, 10]));

/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá

  constructor() {
    this.lastCalculatedResult = 0;
  }

  inputValidation(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Inputs must be numbers');
    }
  }

  add(a, b) {
    this.inputValidation(a, b);
    this.lastCalculatedResult = a + b;
    return this.lastCalculatedResult;
  }

  subtract(a, b) {
    this.inputValidation(a, b);
    this.lastCalculatedResult = a - b;
    return this.lastCalculatedResult;
  }

  multiply(a, b) {
    this.inputValidation(a, b);
    this.lastCalculatedResult = a * b;
    return this.lastCalculatedResult;
  }

  divide(a, b) {
    this.inputValidation(a, b);
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    this.lastCalculatedResult = a / b;
    return this.lastCalculatedResult;
  }

  getLastResult() {
    return this.lastCalculatedResult;
  }
}

Calculator.prototype.exponentiate = function (base, exponent) {
  this.inputValidation(base, exponent);
  if (exponent === 0) {
    this.lastCalculatedResult = 1;
  } else if (exponent < 0) {
    throw new Error('Exponentiation with negative exponent is not allowed');
  } else {
    this.lastCalculatedResult = base ** exponent;
  }

  return this.lastCalculatedResult;
};

// const calc = new Calculator();

// console.log(calc.add(5, 4));
// console.log(calc.add(5, 'b'));
// console.log(calc.getLastResult());
// console.log(calc.exponentiate(2, 3));
// console.log(calc.exponentiate(2, 'b'));

module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
};
