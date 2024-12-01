function rollDice()
{
  return Math.floor(Math.random() * 6) + 1;
}

var randomNumber1 = rollDice();
var randomNumber2 = rollDice();

function getDiceImage(diceNumber) {
  return "./images/dice" + diceNumber + ".png";
}

var dice1 = document.querySelector(".dice .img1");
dice1.setAttribute("src", getDiceImage(randomNumber1));

var dice2 = document.querySelector(".dice .img2");
dice2.setAttribute("src", getDiceImage(randomNumber2));

var title = document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
  title.innerText = "🚩 Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  title.innerText = "Player 2 Wins! 🚩";
} else {
  title.innerText = "Draw! 🤝";
}
