// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }
  
  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
 
    // Play music when the games
    audio.play();
    // Start button disappears when clicked
    startBtn.style.display = "none";
    // Start image disappears when game starts
    coverStart.style.display = "none";
    
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?
    // If player dies, currentHits increase by 1 and text is updated
    if (this.isPlayerDead()) {
      currentHits += 1;
      hitCount.innerHTML = `Bludger Hits: ${currentHits}`;
      replayLives();
      return;
    } 

  // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
  setTimeout(this.gameLoop, 20);
  };
  
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  //615 harry's location on y axis
  isPlayerDead = () => {
    let hit = false;
    this.enemies.forEach((enemy) => {
      if (enemy.x === this.player.x && enemy.y + 25 >= 615) {   
        //console.log("HIT"); multiple why? setTimeout is 20 ms, so console logs same bludger if still touching harry after frame
        hit = true;
        enemy.update();
      } 
    });
      score += 10;
      scoreText.innerHTML = `Score: ${score}`; 
      getScore();
      return hit;
  }
}

// Game over if hit 3 times
let currentHits = 0;
replayLives = () => {
  if (currentHits === 3) {
    audio.pause();
    gameEnd.style.width = "750px";
    gameEnd.style.height = "750px";
    matchOver.innerHTML = "MATCH OVER";
    matchOverText.innerHTML = "OFF TO THE HOSPITAL WING YOU GO";
    setTimeout(location.reload.bind(location), 1000);
  } else {
    gameEngine.gameLoop();
  }
 return;
}
 
// Level becomes more difficult based on score and game win at 15000 points
let score = 0;
getScore = () => {
  if (score > 7500 && score < 9990) {
    MAX_ENEMIES = 5;
  } else if (score > 10000 && score < 14999) {
    MAX_ENEMIES = 6;
    speed = Math.random() / 2 + 0.45;
  } else if (score > 15000) {
    audio.pause();
    gameEnd.style.width = "750px";
    gameEnd.style.height = "750px";
    gameEnd.style.backgroundImage = "url(./images/quidditchWin.png)";
    matchOver.innerHTML = "GRYFFINDOR WINS";
    matchOver.style.color = "goldenrod";
    clearTimeout(setTimeFunc);
  }
  return;
}




