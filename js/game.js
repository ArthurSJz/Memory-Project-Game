// Universal Variables
const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const characters = [
  "Blastoise",
  "Pikachu",
  "Eevee",
  "Charmander",
  "Psyduck",
  "Cubone",
  "Eevolutions",
  "Jigglytuff",
  "Squirtles",
  "Slowbro",
];

let firstCard = "";
let secondCard = "";

// Giving tags to the cards to make them "match"
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Check if all cards are already found
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled_card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Congrats, ${spanPlayer.innerHTML}! You caught them All in ${timer.innerHTML} seconds!`
    );
  }
};

// check if cards matches one another else it goes back hidden
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled_card");
    secondCard.firstChild.classList.add("disabled_card");

    firstCard = "";
    secondCard = "";


    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal_card");
      secondCard.classList.remove("reveal_card");
      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// revealing MAX of 2 cards
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal_card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal_card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal_card");
    secondCard = target.parentNode;
    checkCards();
  }
};


// creating cards and giving the ability to click on them
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);
  return card;
};


// loading the game: Creating and Shuffling the cards
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

// creating a timer
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
  }, 1000);
};


// window.onload lets the page do something when it loads, in this case, start the game and put the timer and the name saved localy
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");

  startTimer();
  loadGame();
};
