const buttonColors = ["red", "blue", "green", "yellow"];
const NUMBER_OF_BUTTONS = buttonColors.length;
const FADE_TIME = 100;
const GAP_TIME = 500;
const REPEAT_TIME = 7000;
const REPLAY_PAUSE_TIME = 1000;
const WRONG_FLASH_TIME = 200;


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

function startSequence() {
  animateButtonInSequence(0);
}

function updateLevelTitle() {
  $("#level-title").text("Level " + level);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * NUMBER_OF_BUTTONS);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  updateLevelTitle();
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
  startSequence();
  sequenceRepeaterID = setInterval(startSequence, REPEAT_TIME);
}

function startGame() {
  nextSequence();
  showGamePattern();
}

function replayGamePattern() {
  userClickedPattern = [];
  clearInterval(sequenceRepeaterID);
  setTimeout(showGamePattern, REPLAY_PAUSE_TIME);
}

function startOver() {
  level = 0;
  updateLevelTitle();
  gamePattern = [];
  userClickedPattern = [];
  clearInterval(sequenceRepeaterID);
  $("#level-title").text("Game Over, Press Any Key to Restart")
}

function respondToCorrectPattern() {
  var sound = new Audio("sounds/correct.mp3");
  sound.play();
  replayGamePattern();
  nextSequence();
}

function respondToWrongPattern() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  startOver();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, WRONG_FLASH_TIME);
}

function checkUserPattern() {
  if (userClickedPattern.toString() == gamePattern.toString()) {
    respondToCorrectPattern();
  } else {
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
        respondToWrongPattern();
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
