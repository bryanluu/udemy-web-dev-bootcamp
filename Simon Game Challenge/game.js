const buttonColors = ["red", "blue", "green", "yellow"];
const NUMBER_OF_BUTTONS = buttonColors.length;
const FADE_TIME = 100;
const WAIT_TIME = 500;


var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function flashButton(color) {
  $("#" + color).fadeOut(FADE_TIME).fadeIn(FADE_TIME);
}

function playButtonSound(color) {
  const sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animateButtonInSequence (stepIndex) {
  if (stepIndex >= gamePattern.length)
    return;

  var buttonColor = gamePattern[stepIndex];
  flashButton(buttonColor);
  playButtonSound(buttonColor);

  setTimeout(function () {
    animateButtonInSequence(stepIndex + 1);
  }, WAIT_TIME);
}

function showSequence() {
  animateButtonInSequence(0);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * NUMBER_OF_BUTTONS);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  showSequence();

  $("#level-title").text("Level " + level);

  level++;

  return gamePattern;
}

function animateButtonPress(color) {
  var button = $("#" + color);
  button.addClass("pressed");

  setTimeout(function () {
    button.removeClass("pressed");
  }, FADE_TIME);
}

function handleButtonClick(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animateButtonPress(userChosenColor);
  playButtonSound(userChosenColor);
  console.log(userClickedPattern);
}

function startGame() {
  nextSequence();
}

$(".btn").click(handleButtonClick);
$(document).on("keydown", function () {
  if (level === 0) {
    startGame();
  }
});
