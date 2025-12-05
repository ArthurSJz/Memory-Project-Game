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
    const disabledCards = document.querySelectorAll('.disabled_card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        const timeTaken = Number(timer.innerHTML);
        const playerName = localStorage.getItem('player');

        // Save current game result
        savePlayerScore(timeTaken, playerName);

        // Display end screen with updated scores
        const endScreen = document.getElementById('end-screen');
        endScreen.style.display = 'block';
        document.getElementById('final-time').innerHTML = timeTaken;

        const bestTimesList = document.getElementById('best-times-list');
        bestTimesList.innerHTML = ''; // Clear previous list
        const scores = getPlayerScores();
        scores.forEach(({ name, time }, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `#${index + 1}: ${name} - ${time} seconds`;
            bestTimesList.appendChild(listItem);
        });
    }
};

const restartGame = () => {
  const endScreen = document.getElementById("end-screen");
  endScreen.style.display = "none";

  grid.innerHTML = ''; // Clear the grid
  timer.innerHTML = '0'; // Reset the timer

  startTimer(); // Restart the timer
  loadGame(); // Reload the game
};
function newPlayer() {
  // Clear the player's name from localStorage
  localStorage.removeItem('player');

  // Redirect to the login page
  window.location = '../index.html'; 
}


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

  front.style.backgroundImage = `url('../Images/${character}.png')`;

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

//Save Best times
const savePlayerScore = (time, playerName) => {
    // Retrieve the current scoreboard
    let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];

    // Add the new player score
    scoreboard.push({ name: playerName, time: time });

    // Sort by time (ascending)
    scoreboard.sort((a, b) => a.time - b.time);

    // Keep only the top 5 scores
    scoreboard = scoreboard.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
};

const getPlayerScores = () => {
    return JSON.parse(localStorage.getItem('scoreboard')) || [];
};


// window.onload lets the page do something when it loads, in this case, start the game and put the timer, the name saved localy and start music
window.onload = () => {
spanPlayer.innerHTML = localStorage.getItem("player");
const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.innerText ="Pause Music"

musicToggle.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(error => {
      console.error("Music play failed:", error);
    });
    musicToggle.innerText = "Pause Music";
  } else {
    backgroundMusic.pause();
    musicToggle.innerText = "Play Music";
  }
});
  
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
  startTimer();
  loadGame();


};
