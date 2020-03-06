/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();

// Function to change or goto next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Toggling active class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide the dice again
  document.querySelector(".dice").style.visibility = "hidden";
}

// Function for new game i.e. initialization
function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 - Player1, 1 - Player2

  // Hide the dice
  document.querySelector(".dice").style.visibility = "hidden";

  // Making all scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Putting back player names
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Removing winner styles and active players
  document.querySelector("#name-0").style.color = "#555";
  document.querySelector("#name-1").style.color = "#555";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// Handling the event for rolling the dice
document.querySelector(".btn-roll").addEventListener("click", function(e) {
  if (gamePlaying) {
    // 1. Random number
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    var diceNumberDup = diceNumber;

    // 2. Display the result i.e. correct dice image
    var diceDom = document.querySelector(".dice");
    diceDom.style.visibility = "visible";
    diceDom.src = `dice-${diceNumber}.png`;

    // Check if you get consecutive 6's
    if (diceNumber === 6 && diceNumberDup === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = "0";
      // Next Player
      nextPlayer;
    } else if (diceNumber !== 1) {
      // Add score
      roundScore += diceNumber;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// Handling the event for holding the dice
document.querySelector(".btn-hold").addEventListener("click", function(e) {
  if (gamePlaying) {
    // Add CURRENT SCORE to GLOBAL SCORE
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the player won
    if (scores[activePlayer] >= 100) {
      console.log(`Player${activePlayer + 1} Won!`);
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner";
      document.querySelector(`#name-${activePlayer}`).style.color = "#eb4d4d";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");

      // Hide the dice again
      document.querySelector(".dice").style.visibility = "hidden";
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// Handling the event for new game
document.querySelector(".btn-new").addEventListener("click", init);
