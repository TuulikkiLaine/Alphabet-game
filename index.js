const lang = document.documentElement.lang;

const words = [
  "ankka",
  "apina",
  "asuntoauto",
  "auto",
  "banaani",
  "bussi",
  "etana",
  "hattu",
  "hauva",
  "hevonen",
  "hiiri",
  "höyryveturi",
  "juna",
  "jäätelö",
  "kala",
  "kana",
  "kenkä",
  "kissa",
  "kukko",
  "kuu",
  "lammas",
  "lehmä",
  "lintu",
  "laiva",
  "metro",
  "muna",
  "mustikka",
  "nalle",
  "pallo",
  "paloauto",
  "papukaija",
  "pasta",
  "pingviini",
  "pizza",
  "poliisi",
  "possu",
  "pupu",
  "puu",
  "pöllö",
  "ratikka",
  "rattaat",
  "silta",
  "susi",
  "talo",
  "traktori",
  "tunneli",
  "vuohi",
];

const wordsEnglish = [
  "duck",
  "monkey",
  "van",
  "car",
  "banana",
  "bus",
  "snail",
  "hat",
  "dog",
  "horse",
  "mouse",
  "locomotive",
  "train",
  "icecream",
  "fish",
  "chicken",
  "shoe",
  "cat",
  "rooster",
  "moon",
  "sheep",
  "cow",
  "bird",
  "ship",
  "subway",
  "egg",
  "blueberry",
  "teddybear",
  "ball",
  "firetruck",
  "parrot",
  "pasta",
  "penguin",
  "pizza",
  "police",
  "pig",
  "bunny",
  "tree",
  "owl",
  "tram",
  "cart",
  "bridge",
  "wolf",
  "house",
  "tractor",
  "tunnel",
  "goat",
];

const wordObjects = words.map((fiWord, index) => ({
  fi: fiWord,
  en: wordsEnglish[index],
}));

let gameIsActive = false;

const contentElement = document.getElementById("js-content");
const imageElement = document.getElementById("js-image");
const playAgainElement = document.getElementById("js-play-again");
const applause = new Audio("applause.mp3");

document.getElementById("js-hide-images").addEventListener("click", (e) => {
  e.target.blur();
  document.body.classList.toggle("images-hidden");
});

const init = () => {
  document.getElementById("js-content").focus();

  playAgainElement.classList.remove("active");
  applause.pause();
  applause.currentTime = 0;
  gameIsActive = true;

  let currentWord = wordObjects[Math.floor(Math.random() * words.length)];
  const letters =
    lang === "en" ? currentWord.en.split("") : currentWord.fi.split("");
  const lettersHtml = letters
    .map((letter) => `<span class="letter">${letter}</span>`)
    .toString()
    .replaceAll(",", "");

  contentElement.innerHTML = lettersHtml;
  imageElement.style.backgroundImage = `url(images/${currentWord.fi}.jpg)`;

  let currentKeyIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !gameIsActive) {
      init();
    } else if (
      currentKeyIndex < letters.length &&
      e.key.toLowerCase() === letters[currentKeyIndex].toLowerCase()
    ) {
      document
        .querySelector(`.letter:nth-child(${currentKeyIndex + 1})`)
        .classList.add("resolved");
      currentKeyIndex += 1;
      if (currentKeyIndex >= letters.length) {
        gameIsActive = false;
        playAgainElement.classList.add("active");
        applause.play();
      }
    }
  });
};

init();
