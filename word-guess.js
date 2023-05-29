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

async function validateWord() {
    insertAnimation();

    let data = {word: letters}
    let payload = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const res = await fetch(validateUrl, payload)
    const result = await res.json();

    await removeAnimation();
    return result.validWord
}

function getBoxesArray () {
    let targetBoxes = [];
    for (i=0; i <5; i++) {
        targetBoxes.push(boxes[coordinateToIndex(numOfTry, i)])
    }
    return targetBoxes
}


function isItAnswer() {
    return letters === answerWord
}


function renderCongrat () {
    const titleLetter = document.querySelector(".title-letter")
    titleLetter.classList.add('rainbow-boi')

    setTimeout(() => {
        window.alert("congrat");
    }, 0);
}

function renderHint () {
    let rightPositionIndex = [];
    let isInLettersIndex = [];
    let notIncludeIndex = [];
    let isInLetters = new Set();

    for (i=0; i<5; i++) {
        if (answerWord[i] === letters[i]) {
            rightPositionIndex.push(i);
        } else if (answerWord.includes(letters[i])) {
            if (!isInLetters.has(letters[i])) {
                isInLettersIndex.push(i)
            }
            isInLetters.add(letters[i])
        } else {
            notIncludeIndex.push(i)
        }
    }

    rightPositionIndex.forEach(ele => {boxes[coordinateToIndex(numOfTry, ele)].style.backgroundColor = "green"})
    isInLettersIndex.forEach(ele => {boxes[coordinateToIndex(numOfTry, ele)].style.backgroundColor = "yellow"})
    notIncludeIndex.forEach(ele => {boxes[coordinateToIndex(numOfTry, ele)].style.backgroundColor = "blue"})
}




async function renderInvalid () {
    const targetBoxes = getBoxesArray();
    targetBoxes.forEach((ele) => {ele.style.border="3px solid red"})
    await delay(500);
    targetBoxes.forEach((ele) => {ele.style.border="3px solid grey"})
}

function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


async function processEnter() {

    if (await validateWord()){
        if (isItAnswer()) {
            renderCongrat();
        } else {
            renderHint();
            letters = "";          
            numOfTry += 1;
        }
        
    } else {
        renderInvalid();
        console.log('invalid');
    }
}

function getUserKeyInput(event) {
  if (event.key.length > 1) {
    if (event.key === "Enter") {
    if (letters.length === 5) {
        processEnter()
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
    answerWord = result.word
    console.log(answerWord);
    removeAnimation();
}

function insertAnimation () {
    const imgTag = document.createElement("img");

    imgTag.setAttribute('class', 'spinny-capuchino');
    imgTag.setAttribute('src', 'cap-modified.png');
    imgTag.setAttribute('alt', 'coffee');

    animationScreen.appendChild(imgTag);
}

async function removeAnimation () {
    const spinny = document.querySelector(".spinny-capuchino")
    spinny.remove();
}

function init() {
    getWord();
    gamingBoard.addEventListener("keydown", getUserKeyInput);

}

init();


