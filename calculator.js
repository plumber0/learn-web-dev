let result = "0";
const numberRegister = [];
const operatorRegister = [];

const resultNum = document.querySelector(".result-num");

function appendNumber(current, number) {
  if (result[0] == 0) {
    result = `${number}`;
  } else {
    result = `${current}${number}`;
  }
  resultNum.innerText = result;
}

function performOperator(operator) {
  const currentInt = Number.parseInt(result);
  numberRegister.push(currentInt);
  operatorRegister.push(operator);
  result = "0";
  resultNum.innerText = result;
}

function operate(targetA, targetB, operate) {
  if (operate === "+") {
    return targetA + targetB;
  } else if (operate === "-") {
    return targetA - targetB;
  } else if (operate === "*") {
    return targetA * targetB;
  } else if (operate === "/") {
    return Math.round(targetA / targetB);
  }
}

function performCalculate() {
  const currentInt = Number.parseInt(result);
  numberRegister.push(currentInt);

  let calcResult;

  for (i = 0; i < operatorRegister.length; i++) {
    if (i === 0) {
      calcResult = operate(
        numberRegister[0],
        numberRegister[1],
        operatorRegister[i]
      );
    } else {
      console.log(numberRegister[i + 1], operatorRegister[i]);
      calcResult = operate(
        calcResult,
        numberRegister[i + 1],
        operatorRegister[i]
      );
    }
    console.log(calcResult);
  }
  result = calcResult;
  resultNum.innerText = result;
}

for (i = 0; i < 10; i++) {
  const value = i;
  document
    .querySelector(`.num-${i}`)
    .addEventListener("click", () => appendNumber(result, value));
}

document
  .querySelector(".plus")
  .addEventListener("click", () => performOperator("+"));
document
  .querySelector(".minus")
  .addEventListener("click", () => performOperator("-"));
document
  .querySelector(".multiply")
  .addEventListener("click", () => performOperator("*"));
document
  .querySelector(".divide")
  .addEventListener("click", () => performOperator("/"));
document
  .querySelector(".equal")
  .addEventListener("click", () => performCalculate());
