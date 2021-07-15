"use strict";
const h1Element = document.getElementById("title");
const openBtn = document.getElementById("openButton");

let numberCount = 6;
let choseNumber = [];
// Winning numbers
let result = [];
let specialNumber = 0;

//displayMessage
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//random function
const randomNumber = function () {
  const temp = Math.trunc(Math.random() * 49) + 1;
  return temp;
};

//pick 6 numbers and one bonus number
const openWinningNumber = function () {
  let temp = "";
  for (let count = 7; count > 0; count--) {
    temp = randomNumber();
    for (let i = 0; i < result.length; i++) {
      if (result[i] == temp) {
        result.splice(i, 1);
        count++;
      }
    }
    if (count === 1) {
      specialNumber = temp;
    } else result.push(temp);
  }
  return result;
};

//lucky dip
const autoChoose = function (arr) {
  let temp = "";
  for (let count = 6 - arr.length; count > 0; count--) {
    temp = randomNumber();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == temp) {
        arr.splice(i, 1);
        count++;
        numberCount++;
      }
    }
    numberCount--;
    arr.push(temp);
  }
  return arr;
};

//render
const renderNumber = function () {
  result.forEach((el) => {
    renderDisplay(el);
    // console.log(el);
  });
  renderDisplay(specialNumber);
};

const renderDisplay = function (number) {
  document.querySelector(".number").textContent = number;
};

// Check repeating number
const checkRepeating = function (arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (choseNumber[i] == num) {
      // arr.splice(i, 1);
      return true;
    }
  }
};

// Check bonus number
const checkSpecialNumber = function (arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (choseNumber[i] == num) {
      // arr.splice(i, 1);
      return true;
    }
  }
  return false;
};

//Check numbers
const checkNumber = function (myNumber, drawNumber, specialNum) {
  const combineNumber = myNumber.concat(drawNumber);
  // check repeating
  const checkResult = combineNumber.filter(function (el, index, arr) {
    return arr.indexOf(el) === index;
  });
  console.log(combineNumber);
  console.log(checkResult);

  if (checkSpecialNumber(myNumber, specialNumber)) {
    switch (checkResult.length) {
      case 7:
        return "OMG is second prize";
        break;
      case 8:
        return "OMG is fourth prize";
        break;
      case 9:
        console.log("1,000");
        break;
      case 10:
        console.log("400");
        break;
    }
  } else {
    switch (checkResult.length) {
      // 6
      case 6:
        document.querySelector("body").style.backgroundColor = "#ca3e47";
        h1Element.innerText = "Super Lucky Guy!";
        document.querySelector(".number").style.width = "80rem";
        document.querySelector(".number").textContent =
          "💰💰💰💰💰💰💰💰💰💰💰💰";

        return "OMG is Jackpot!!!!!";
        break;
      // 5
      case 7:
        return "OMG is third prize";
        break;
      // 4
      case 8:
        return "You got 2,000 Bro";
        break;
      // 3
      case 9:
        return "You got 400 Bro";
        break;
      default:
        return "💩Sorry Bro💩";
        break;
    }
  }
};

// lucky dip
document.querySelector(".auto").addEventListener("click", function () {
  autoChoose(choseNumber);
  document.querySelector(".choseNumber").textContent = choseNumber;
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").textContent = "?";
  displayMessage("");
  h1Element.innerText = "Ready!??";
});

//Enter numbers
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  // the result of lottery
  // document.querySelector(".number").textContent = guess;
  renderDisplay(guess);

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");
    return;
  }
  // Check number
  if (guess >= 50 || guess < 0) {
    displayMessage("invalid number!");
    return;
  }

  if (numberCount === 0 || choseNumber === 6) {
    displayMessage("⛔️ NO more numbers");
  }

  if (checkRepeating(choseNumber, guess)) {
    displayMessage("Repeating number!");
    return;
  }

  // Enter number
  if (guess && numberCount > 0 && !checkRepeating(choseNumber, guess)) {
    document.querySelector(".message").textContent =
      "👉 Your enter number: " + guess;
    choseNumber.push(guess);
    document.querySelector(".choseNumber").textContent = choseNumber;
    numberCount--;
  }
});

///////////////////////////////////////////
/*  MODAL  */
///////////////////////////////////////////
document.querySelector(".open").addEventListener("click", function () {
  if (numberCount != 0) {
    displayMessage("⛔️ You must pick 6 numbers!");
    return;
  }

  if (result.length === 6) {
    return;
  }
  // need to fix: button doesn't disappear()
  openBtn.style.backgroundColor = "#60b347";
  openBtn.style.color = "#60b347";

  openWinningNumber();
  renderNumber(result);
  console.log(result);
  document.querySelector(".resultNumber").textContent = result;
  h1Element.innerText = "🎉SPECIAL NUMBER🎉!!";
  document.querySelector(".number").style.width = "30rem";
});

document.querySelector(".again").addEventListener("click", function () {
  displayMessage("👉 Enter number...");
  h1Element.innerText = "My lottery!";
  document.querySelector(".choseNumber").textContent = "?";
  document.querySelector(".resultNumber").textContent = "?";
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  document.querySelector(".guess").value = "";
  result = [];
  choseNumber = [];
  numberCount = 6;

  openBtn.style.backgroundColor = "#eee";
  openBtn.style.color = "#222";
});

document.querySelector(".result").addEventListener("click", function () {
  const message = checkNumber(choseNumber, result, specialNumber);
  displayMessage(message);
});

///////////////////////////////////////////
/*  MODAL  */
///////////////////////////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal[0].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
