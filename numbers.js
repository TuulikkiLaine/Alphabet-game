let gameIsActive = false;

const contentElement = document.getElementById("js-content");
const numberElement = document.getElementById("js-number");
const playAgainElement = document.getElementById("js-play-again");
const applause = new Audio("applause.mp3");
let counter = 0;

const init = () => {
  playAgainElement.classList.remove("active");
  contentElement.innerHTML = "";
  applause.pause();
  applause.currentTime = 0;
  gameIsActive = true;

  const number = Math.floor(Math.random() * 9) + 1;

  let html = "";

  for (let i = 1; i <= number; i++) {
    html += `<div class="item">${i}</div>`;
  }

  contentElement.innerHTML = html;
  numberElement.innerHTML = number;

  const count = (e) => {
    if (e.code == "Space" && gameIsActive && counter < number) {
      document
        .querySelector(`.item:nth-child(${counter + 1})`)
        .classList.add("resolved");
      counter += 1;
    }
    if (e.code == "Space" && gameIsActive && counter === number) {
      playAgainElement.classList.add("active");
      applause.play();
      gameIsActive = false;
      counter = 0;
    }
    if (e.key == "Enter" && !gameIsActive) {
      document.removeEventListener("keydown", count);
      init();
    }
  };

  document.addEventListener("keydown", count);
};

init();
