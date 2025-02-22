const hangmanImage = document.querySelector(".hangman-box img");
const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const hintText = document.querySelector(".hint-text b");

let currentWord = "";
let correctLetters = [];
let wrongGuessCount = 0;
const maxGuesses = 6;

const wordList = [
  { word: "rainbow", hint: "A colorful arc in the sky" },
  { word: "javascript", hint: "A popular programming language" },
  { word: "hangman", hint: "The game you are playing" },
  { word: "apple", hint: "A popular fruit" },
  { word: "banana", hint: "A yellow fruit" },
  { word: "car", hint: "A vehicle that runs on roads" },
  { word: "computer", hint: "An electronic device for processing data" },
  {
    word: "mountain",
    hint: "A large natural elevation of the earth's surface",
  },
  { word: "ocean", hint: "A vast body of salt water" },
  { word: "guitar", hint: "A stringed musical instrument" },
  { word: "tree", hint: "A tall plant with a trunk and branches" },
  { word: "dog", hint: "A domesticated carnivorous mammal" },
  { word: "cat", hint: "A small domesticated carnivorous mammal" },
  { word: "house", hint: "A building for human habitation" },
  { word: "sun", hint: "The star that provides light and heat to the earth" },
  { word: "moon", hint: "Earth's natural satellite" },
  { word: "star", hint: "A luminous point in the night sky" },
  { word: "book", hint: "A set of written or printed pages" },
  { word: "school", hint: "A place for education" },
  { word: "laptop", hint: "A portable personal computer" },
  { word: "phone", hint: "A device for voice communication" },
  { word: "camera", hint: "A device for taking photographs" },
  { word: "bicycle", hint: "A two-wheeled vehicle powered by pedaling" },
  { word: "football", hint: "A popular sport played with a round ball" },
  { word: "basketball", hint: "A sport played with a ball and hoops" },
  {
    word: "soccer",
    hint: "A sport played with a round ball, also known as football",
  },
  { word: "IceCream", hint: "A frozen dessert made from dairy products" },
  { word: "chocolate", hint: "A sweet treat made from cocoa" },
  { word: "beach", hint: "A sandy shore beside a body of water" },
  { word: "city", hint: "A large town or populated area" },
  { word: "vacation", hint: "An extended period of leisure travel" },
  { word: "shopping", hint: "The activity of buying goods" },
  { word: "party", hint: "A social gathering" },
  { word: "holiday", hint: "A day of celebration or relaxation" },
  { word: "friend", hint: "A person with whom you share a close bond" },
  { word: "family", hint: "A group of related individuals" },
  { word: "weather", hint: "The state of the atmosphere at a particular time" },
  {
    word: "temperature",
    hint: "A measure of the warmth or coldness of an object or environment",
  },
  { word: "earth", hint: "The third planet from the Sun" },
  { word: "sky", hint: "The expanse of air above the earth" },
  { word: "cloud", hint: "A visible mass of condensed water vapor" },
  { word: "rain", hint: "Water droplets falling from the sky" },
  { word: "snow", hint: "Frozen water crystals that fall from the sky" },
  { word: "wind", hint: "The movement of air" },
  {
    word: "lightning",
    hint: "A flash of light produced by an electrical discharge",
  },
  { word: "thunder", hint: "The sound caused by lightning" },
  {
    word: "volcano",
    hint: "An opening in the Earth's crust through which lava and gases escape",
  },
  { word: "earthquake", hint: "A sudden shaking of the ground" },
  {
    word: "desert",
    hint: "A barren area of land with little water and vegetation",
  },
  { word: "forest", hint: "A large area covered chiefly with trees" },
  { word: "river", hint: "A large, flowing body of water" },
  { word: "lake", hint: "A large body of water surrounded by land" },
  {
    word: "mountain",
    hint: "A large natural elevation of the earth's surface",
  },
  { word: "island", hint: "A piece of land surrounded by water" },
  { word: "continent", hint: "One of the main landmasses on Earth" },
  { word: "country", hint: "A nation with its own government" },
  { word: "flag", hint: "A piece of fabric with a design used as a symbol" },
  {
    word: "nationality",
    hint: "The status of belonging to a particular nation",
  },
  { word: "government", hint: "The group of people governing a country" },
  { word: "president", hint: "The head of state in some countries" },
  { word: "capital", hint: "The city where the government is based" },
  { word: "currency", hint: "A system of money used in a country" },
  { word: "market", hint: "A place where goods are bought and sold" },
  { word: "economy", hint: "The wealth and resources of a country or region" },
  { word: "job", hint: "A role in which someone works for pay" },
  { word: "career", hint: "A profession or occupation" },
  { word: "salary", hint: "A fixed regular payment for work" },
  { word: "company", hint: "A business or firm" },
  { word: "employee", hint: "A person employed by a company" },
  { word: "employer", hint: "A person or organization that hires employees" },
  {
    word: "manager",
    hint: "A person responsible for managing a company or department",
  },
  { word: "team", hint: "A group of people working together" },
  { word: "leader", hint: "A person who leads a group or organization" },
  { word: "meeting", hint: "An assembly of people for discussion" },
  { word: "conference", hint: "A large formal meeting" },
  {
    word: "conference",
    hint: "A formal meeting where people discuss specific topics",
  },
  { word: "phone", hint: "A device used to make calls" },
  { word: "address", hint: "The location where someone lives or works" },
  { word: "message", hint: "A communication or information sent" },
  { word: "letter", hint: "A written or printed message" },
  { word: "email", hint: "A method of sending messages electronically" },
  { word: "text", hint: "A written message sent by mobile phone" },

  { word: "website", hint: "A collection of web pages" },
  { word: "blog", hint: "A website containing posts on various topics" },
  { word: "internet", hint: "A global computer network" },
  {
    word: "technology",
    hint: "The application of scientific knowledge for practical purposes",
  },
  {
    word: "robot",
    hint: "A machine capable of carrying out tasks automatically",
  },
  { word: "data", hint: "Facts and statistics collected for reference" },
  { word: "programming", hint: "The process of writing code for computers" },
];

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.innerText = hint;

  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "hangman0.svg";
  guessesText.innerText = `0/${maxGuesses}`;
  keyboard.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.add(
      "btn",
      "btn-success",
      "p-3",
      "fs-4",
      "fw-bold",
      "rounded",
      "text-uppercase",
      "border-2"
    );
    button.classList.remove("disabled");
  });
};

const revealLetters = (letter) => {
  [...currentWord].forEach((char, index) => {
    if (char === letter) {
      if (!correctLetters.includes(letter)) correctLetters.push(letter);
      const letters = wordDisplay.querySelectorAll("li");
      letters[index].innerText = char;
      letters[index].classList.add("guessed");
    }
  });
};

const endGame = (isVictory) => {
  setTimeout(() => {
    gameModal.classList.add("show");
    const modalImageSrc = isVictory ? "AuraAdd.gif" : "AuraSub.gif";
    const modalMessage = isVictory
      ? "Congratulations! You Won!"
      : "Game Over! Better luck next time.";
    const modalWord = currentWord;

    gameModal.querySelector(".modal-image").src = modalImageSrc;
    gameModal.querySelector(".message").innerText = modalMessage;
    gameModal.querySelector(".correct-word").innerText = modalWord;
  }, 300);
};

const handleGuess = (button, clickedLetter) => {
  if (button) {
    button.disabled = true;
    button.classList.add("disabled");
  }

  if (currentWord.includes(clickedLetter)) {
    revealLetters(clickedLetter);
  } else {
    wrongGuessCount++;
    hangmanImage.src = `hangman${wrongGuessCount}.svg`;
  }

  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;

  const uniqueCorrectLetters = new Set(correctLetters);
  const uniqueWordLetters = new Set(currentWord);

  if (wrongGuessCount === maxGuesses) {
    endGame(false);
  } else if (uniqueCorrectLetters.size === uniqueWordLetters.size) {
    endGame(true);
  }
};

const handleKeydown = (event) => {
  const letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    const button = keyboard.querySelector(`[data-letter="${letter}"]`);
    if (button && !button.disabled) {
      handleGuess(button, letter);
    }
  }
};

const createKeyboard = () => {
  keyboard.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.setAttribute("data-letter", String.fromCharCode(i));
    button.addEventListener("click", (e) =>
      handleGuess(e.target, e.target.dataset.letter)
    );
    keyboard.appendChild(button);
  }
};

const initializeGame = () => {
  createKeyboard();
  getRandomWord();
  gameModal.classList.remove("show");
};

document.addEventListener("keydown", handleKeydown);
document.querySelector(".play-again").addEventListener("click", initializeGame);

initializeGame();
