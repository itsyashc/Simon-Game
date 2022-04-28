var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

// To run the game with a key press.
var start = 0;
$(document).keydown(function () {
  if (start === 0) {
    nextSequence();
    start++;
  } else {
    alert("game is already started, so PLAY.");
  }
});

//To record which button user clicked and get a sound.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); //also use : this.id
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  //we know in coding counting start with 0, but .length counts from 1 and that's why -1.
});

function nextSequence() {
  //To select randomly any colour/button from the array

  var randomNumber = Math.floor(Math.random() * 3.5);
  var randomChosenColour = buttonColours[randomNumber];
  //whatever num comes it select from buttonColour and push.

  gamePattern.push(randomChosenColour);
  //to add selected color to gamePattern to build logic of game.

  //To give a flash signal for which colour or say button is selected randomly.

  var buttonSelector = "#" + randomChosenColour;
  $(buttonSelector).fadeOut(75).fadeIn(75);
  //fadeIn & fadeOut is jquery animation and (75) is time/sec for.

  // To play audio whenever a new item flash or add to the sequence.
  playSound(randomChosenColour);

  //To show level to the player, which he is playing.
  $("#level-title").text("level " + level);
  level++;

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");

    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//   To play audio whenever a user clicked or next sequence flash.
function playSound(name) {
  var soundSelector = name + ".mp3";
  var audioForEach = new Audio("sounds/" + soundSelector);
  audioForEach.play();
}

// To add animations when user clicks
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  // To remove class after 100 milliseconds
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

//To restart the game.
function startOver() {
  start = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
