const buttonColors = ["red", "blue", "green", "yellow"];
const NUMBER_OF_BUTTONS = buttonColors.length;
const FADE_TIME = 100;
const GAP_TIME = 500;
const REPEAT_TIME = 7000;
const RESTART_PAUSE_TIME = 1000;


var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var sequenceRepeaterID = null;

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
  }, GAP_TIME);
}

function showSequence() {
  animateButtonInSequence(0);
  // TODO remove debug statement
  console.log(gamePattern, userClickedPattern);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * NUMBER_OF_BUTTONS);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

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

function showGamePattern() {
  showSequence();
  sequenceRepeaterID = setInterval(showSequence, REPEAT_TIME);
}

function startGame() {
  nextSequence();
  showGamePattern();
}

function restartGamePattern() {
  userClickedPattern = [];
  clearInterval(sequenceRepeaterID);
  setTimeout(showGamePattern, RESTART_PAUSE_TIME);
}

function checkUserPattern() {
  if (userClickedPattern.toString() == gamePattern.toString()) {
    var sound = new Audio("sounds/correct.mp3");
    sound.play();
    restartGamePattern();
    nextSequence();
  } else {
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        restartGamePattern();
        break;
      }
    }
  }
}

function handleButtonClick(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animateButtonPress(userChosenColor);
  playButtonSound(userChosenColor);
  checkUserPattern();
}

$(".btn").click(handleButtonClick);
$(document).on("keydown", function () {
  if (level === 0) {
    startGame();
  }
});
