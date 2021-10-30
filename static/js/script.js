// Challenge 1: Your Age in Days

function ageInDays() {
  var birthYear = prompt("What is your birthyear my friend ?");
  var ageInDayss = (2021 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " days old"
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Challenge 2 : Cat Generator

function catGenerator() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "https://cdn2.thecatapi.com/images/MTUwNTgwMg.gif";
  div.appendChild(image);
}

//Challenge 3 : Rock, Paper, Scissor

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  console.log(humanChoice);

  botChoice = numberToChoice(randToRpsInt());
  console.log(botChoice);

  results = decideWinner(humanChoice, botChoice);
  console.log(results);

  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissor"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You Lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied", color: "yellow" };
  } else {
    return { message: "You Won", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
  messageDiv.innerHTML =
    "<h1 style ='color " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '> " +
    finalMessage["message"] +
    " </h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";

  document.getElementById("flex-box-rps-id").appendChild(humanDiv);
  document.getElementById("flex-box-rps-id").appendChild(messageDiv);
  document.getElementById("flex-box-rps-id").appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonRed();
  } else if (buttonThingy.value === "green") {
    buttonGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randNumber]);
  }
}

//Challenge 5: Blackjack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: ".your-box", scores: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: ".dealer-box",
    scores: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const You = blackjackGame["you"];
const Dealer = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, You);
    updateScore(card, You);
    showScore(You);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["scores"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";
    let yourImages = document
      .querySelector(".your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector(".dealer-box")
      .querySelectorAll("img");
    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    You["scores"] = 0;
    Dealer["scores"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";
    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["scores"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["scores"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["scores"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["scores"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["scores"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["scores"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (Dealer["scores"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, Dealer);
    updateScore(card, Dealer);
    showScore(Dealer);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  showResult(computeWinner());
}

//compute winner and return the winner

function computeWinner() {
  let winner;

  if (You["scores"] <= 21) {
    if (You["scores"] > Dealer["scores"] || Dealer["scores"] > 21) {
      blackjackGame["wins"]++;
      winner = You;
    } else if (You["scores"] < Dealer["scores"]) {
      blackjackGame["losses"]++;
      winner = Dealer;
    } else if (You["scores"] === Dealer["scores"]) {
      blackjackGame["draws"]++;
    }
  } else if (You["scores"] > 21 && Dealer["scores"] <= 21) {
    blackjackGame["losses"]++;
    winner = Dealer;
  } else if (You["scores"] > 21 && Dealer["scores"] > 21) {
    blackjackGame["draws"]++;
  }

  console.log("Winner is", winner);
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (winner === You) {
    document.querySelector("#wins").textContent = blackjackGame["wins"];
    message = "You Won!";
    messageColor = "green";
    winSound.play();
  } else if (winner === Dealer) {
    document.querySelector("#losses").textContent = blackjackGame["losses"];
    message = "You Lost!";
    messageColor = "red";
    lossSound.play();
  } else {
    document.querySelector("#draw").textContent = blackjackGame["draws"];
    message = "You Drew";
    messageColor = "brown";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}
