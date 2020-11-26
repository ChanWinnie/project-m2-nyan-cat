// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

let body = document.querySelector("body");
body.style.margin = 0;
body.style.fontFamily = "Arial,serif";

let app = document.getElementById("app");
app.style.display = "flex";
app.style.alignItems = "center";
app.style.justifyContent = "center";
app.style.width = "750px";
app.style.color = "white";

// Add for when game ends
let gameEnd = document.getElementById("gameEnd");
gameEnd.style.position = "absolute";
gameEnd.style.zIndex = 2250;
gameEnd.style.display = "flex";
gameEnd.style.flexDirection = "column";
gameEnd.style.justifyContent = "center";
gameEnd.style.alignItems = "center";
gameEnd.style.backgroundColor = "goldenrod";
// Heading for game end
let matchOver = document.getElementById("matchOver");
matchOver.style.fontSize = "70px";
// Paragraph for game end
let matchOverText = document.getElementById("matchOverText");
matchOverText.style.fontSize = "25px";

// Add the start button and start page
let startBtn = document.getElementById("startBtn");
startBtn.style.position = "absolute";
startBtn.style.fontSize = " 45px";
startBtn.style.padding = "15px 60px";
startBtn.style.border = "none";
startBtn.style.outline = "none";
startBtn.style.borderRadius = " 4px";
startBtn.style.backgroundColor = "goldenrod";
startBtn.style.color = "white";
startBtn.style.zIndex = 2250;
let coverStart = document.getElementById("imageCover");
coverStart.style.width = "750px";
coverStart.style.height = "750px";
coverStart.style.zIndex = 220;
coverStart.style.position = "absolute";
coverStart.style.objectFit = "cover";
coverStart.style.objectPosition = "60% 50%";

// Add the audio
let audio = new Audio("/images/quidditchmusic.mp3");
audio.volume = 0.1;
audio.currentTime = 3;

// We call the gameLoop method to start the game, when the button is clicked
startBtn.addEventListener("click", gameEngine.gameLoop);

// Add hit counter
let hitCount = document.getElementById("hitCounter");
hitCount.style.zIndex = 2100;
hitCount.style.position = "absolute";
hitCount.style.top = "3%";
hitCount.style.left = "2%";
hitCount.style.fontSize = "30px";

// Add score
let scoreText = document.getElementById("scoreBoard");
scoreText.style.zIndex = 2100;
scoreText.style.position = "absolute";
scoreText.style.top = "3%";
scoreText.style.left = "560px";
scoreText.style.fontSize = "30px";



