const acElement = document.querySelector(".modifier");
const operatorElements = document.querySelectorAll(".operation");
const digitsElements = document.querySelectorAll(".digit");
const resultAreaElement = document.getElementById("total");

const firstValue = {
  value: "0",
  isEntered: false,
};
const operator = {
  value: "+",
  isEntered: false,
};
const secondValue = {
  value: "0",
  isEntered: false,
};

let result = "0";

const clear = () => {
  firstValue.isEntered = secondValue.isEntered = operator.isEntered = false;
  firstValue.value = secondValue.value = "0";
  operator.value = "+";
  result = "0";
  displayResult(firstValue.value);
};

const isValidLenght = (numString) => {
  if (numString.charAt(0) === "-") {
    if (numString.length - 1 < 3) return true;
  } else {
    if (numString.length < 3) return true;
  }
  return false;
};

const displayResult = (num) => (resultAreaElement.innerText = num);

const calculating = () => {
  if (operator.value === "+")
    return parseInt(firstValue.value) + parseInt(secondValue.value);
  if (operator.value === "-")
    return parseInt(firstValue.value) - parseInt(secondValue.value);
  if (operator.value === "X")
    return parseInt(firstValue.value) * parseInt(secondValue.value);
  if (operator.value === "/") {
    if (secondValue.value === "0") return "숫자 아님";
    return parseInt(parseInt(firstValue.value) / parseInt(secondValue.value));
  }
};

const firstValueInput = (chr) => {
  if (!firstValue.isEntered && (("0" <= chr && chr <= "9") || chr === "-")) {
    firstValue.value = chr;
    firstValue.isEntered = true;
    if (chr !== "-") displayResult(firstValue.value);
    return;
  }
  if ("0" <= chr && chr <= "9" && isValidLenght(firstValue.value)) {
    if (
      firstValue.value.charAt(0) === "0" ||
      (firstValue.value.charAt(0) === "-" && chr === "0")
    ) {
      firstValue.value = chr;
      return;
    }
    firstValue.value += chr;
    firstValue.isEntered = true;
    displayResult(firstValue.value);
  }
};

const operatorValueInput = (chr) => {
  if (!firstValue.isEntered){
    firstValueInput(chr);
    return;
  }
  if (secondValue.isEntered) {
    const number = calculating();
    displayResult(number);
    firstValue.value = number;
    operator.value = chr;
    secondValue.value = "0";
    secondValue.isEntered = false;
    return
  }
  if (!(chr === "=" || firstValue.value === "-")) {
    operator.value = chr;
    operator.isEntered = true;
  }
};

const secondValueInput = (chr) => {
  if (secondValue.value.charAt(0) === "0") {
    secondValue.value = chr;
  } else if (isValidLenght(secondValue.value)) {
    secondValue.value += chr;
  }
  secondValue.isEntered = true;
  displayResult(secondValue.value);
};

const digitsCallback = (e) => {
  const { target: digitElement } = e;
  const value = digitElement.innerText;
  if (!operator.isEntered) {
    firstValueInput(value);
  } else {
    secondValueInput(value);
  }
};

const operatorCallback = (e) => {
  const { target: operatorElement } = e;
  const value = operatorElement.innerText;
  operatorValueInput(value);
};

const init = () => {
  acElement.addEventListener("click", clear);
  digitsElements.forEach((digit) =>
    digit.addEventListener("click", digitsCallback)
  );
  operatorElements.forEach((operator) =>
    operator.addEventListener("click", operatorCallback)
  );
};

init();
