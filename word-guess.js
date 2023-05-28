console.log("abc");

const boxes = document.querySelectorAll(".word-box");
const targets = document.querySelectorAll(".target-box");
let numOfTry = 0;
let letters = "";

function repalceLastLetter(inputStr, inputCharacter) {
  let chars = inputStr.split("");

  chars[chars.length - 1] = inputCharacter;

  newStr = chars.join("");
  return newStr;
}

function validateWord(letters) {
  console.log(letters);
  letters = "";
}

function getUserKeyInput(event) {
  if (event.key.length > 1) {
    if (event.key === "Enter") {
      if (letters.length === 5) {
        validateWord(letters);
        letters = "";          
        numOfTry += 1;
      }
    } else if (event.key === "Backspace") {
      if (letters.length > 0) {
        const targetsIndex = coordinateToIndex(numOfTry, letters.length - 1);
        letters = letters.slice(0, -1);
        targets[targetsIndex].textContent = "";
        console.log(letters);
      }
    }
  } else {
    if (isLetter(event.key)) {
      insertLetter(event);
    }
  }
}


function insertLetter(event) {
  if (letters.length === 5) {
    letters = repalceLastLetter(letters, event.key);
  } else {
    letters += event.key;
  }

  const targetsIndex = coordinateToIndex(numOfTry, letters.length - 1);

  targets[targetsIndex].textContent = event.key;
  console.log(letters);
}

function coordinateToIndex(numOfTry, letterIndex) {
  return numOfTry * 5 + letterIndex;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

const gamingBoard = document.querySelector(".gaming-board");

gamingBoard.addEventListener("keydown", getUserKeyInput);
console.log(gamingBoard);

//
