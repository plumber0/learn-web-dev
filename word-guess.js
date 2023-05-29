let answerWord = "";

const getWordUrl = "https://words.dev-apis.com/word-of-the-day";
const validateUrl = "https://words.dev-apis.com/validate-word";

const boxes = document.querySelectorAll(".word-box");
const targets = document.querySelectorAll(".target-box");
const gamingBoard = document.querySelector(".gaming-board");
const animationScreen = document.querySelector(".animation-screen")

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

async function getWord() {
    insertAnimation();
    const res = await fetch(getWordUrl);
    const result = await res.json();
    answerWord = result
    removeAnimation();
}

function insertAnimation () {
    const imgTag = document.createElement("img");

    imgTag.setAttribute('class', 'spinny-capuchino');
    imgTag.setAttribute('src', 'cap-modified.png');
    imgTag.setAttribute('alt', 'coffee');

    animationScreen.appendChild(imgTag);
}

function removeAnimation () {
    const spinny = document.querySelector(".spinny-capuchino")
    spinny.remove();
}

function init() {
    getWord();
    gamingBoard.addEventListener("keydown", getUserKeyInput);

}

init();


