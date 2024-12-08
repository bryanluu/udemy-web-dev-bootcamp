function animateButton(drumKey) {
  console.log("Drum " + drumKey + " is doing something...");
  var activeButton = document.querySelector("." + drumKey);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed")
  }, 100);
};

function playSoundForDrum(drumKey) {
  switch (drumKey) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play()
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play()
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play()
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play()
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play()
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play()
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play()
      break;

    default:
      console.log(drumKey);
      break;
  }
}

function handleClick() {
  var drumKey = this.innerHTML;
  playSoundForDrum(drumKey);
  animateButton(drumKey);
}

var drums = document.querySelectorAll(".drum");

document.querySelectorAll(".drum").forEach(
  function (drum) {
    drum.addEventListener("click", handleClick);
  }
);

function handleKeyPress (keyEvent) {
  var drumKey = keyEvent.key;
  playSoundForDrum(drumKey);
  animateButton(drumKey);
}

document.addEventListener("keydown", handleKeyPress);
