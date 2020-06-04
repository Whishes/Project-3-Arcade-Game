// Game state variables
let playerScore = 0,
	score = document.querySelector(".score > span");

// Enemies our player must avoid
class Enemy {
	constructor(x, y, movement) {

		// Variables applied to each of our instances go here,
		this.x = x;
		this.y = y;
		this.movement = movement;

		// The image/sprite for our enemies
		this.sprite = 'images/enemy-bug.png';
	}
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.movement * dt;

	// Restarts enemy movement from the left when Player reaches the water
	if (this.x > 505) {
		this.x = -150;

		// Controls the enemy movement speed
		// Speeds up as the player's point increase (gets harder)
		this.movement = 100 + Math.floor(Math.random() * 600);
	}

	// Checks collisons and restarts player at the bottom of canvas
	if (player.x < this.x + 50 &&
		player.x + 35 > this.x &&
		player.y < this.y + 25 &&
		30 + player.y > this.y) {
		player.x = 200;
		player.y = 400;

		// Resets Player score
		playerScore = 0;
		score.innerText = '0';
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class 
class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'images/char-boy.png';
	}
    
	// Moves Player with keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
				this.x -= this.movement + 50;
				break;
			case 'up':
				this.y -= this.movement + 30;
				break;
			case 'right':
				this.x += this.movement + 50;
				break;
			case 'down':
				this.y += this.movement + 30;
				break;
		}
	}
};

Player.prototype.update = function(dt) {
	// Stops Player from moving off the left/right side of canvas
	if (this.y > 380) {
		this.y = 380;
	}
	if (this.x > 400) {
		this.x = 400;
	}
	if (this.x < 0) {
		this.x = 0;
	}

	// Once player reaches the water, 100 points will be added to their game score
	if (this.y < 0) {
		this.x = 200;
		this.y = 380;
		playerScore++;
		score.innerText = playerScore * 100;
	}
};

// Moved to single class instead of different function
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var allEnemies = [
	new Enemy(-200, 50, 90),
	new Enemy(-200, 135, 100),
	new Enemy(-200, 220, 70)
];

// Canvas position of created enemies and player x, y, movement
let player = new Player(200, 400, 50);

// This listens for key presses
// Allows for the holding of the appropriate key 
document.addEventListener('keydown', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]) = true;
});

// Stops the Player's movement when the key isn't being pressed anymore
document.addEventListener('keyup', function (e) {
	player.handleInput(allowedKeys[e.keyCode]) = false;
});	