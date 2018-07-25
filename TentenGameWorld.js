"use strict";

function tentenGameWorld () {
	this.grid = new mygrid();
	this.figurePanel = new figurePanel();
	this.titleScreen = new titleScreen();
	// this.settingsScreen = new settingsScreen();
	this.restartScreen = new restartScreen();
	
	// this.buttonMenu = new buttonMenu();
	this.buttonSound = new buttonSound(new Vector2(50, 50));
	
	this.buttonRestart = new buttonRestart();
	this.activeFigure = false;
	
	this.score = 0;
	this.highScore = 0;
	
	this.gameOver = false;
	this.fontType = 'Quicksand, Courier New';
	this.loadHighScore();
};

tentenGameWorld.prototype.loadHighScore = function () {
	if (localStorage && localStorage.highScore) {
		this.highScore = JSON.parse(localStorage.highScore);
	}
};

tentenGameWorld.prototype.writeHighScore = function () {
	if (!localStorage)
		return;
	this.highScore = this.score;
	localStorage.highScore = JSON.stringify(this.highScore);
};

tentenGameWorld.prototype.handleInput = function (delta) {
	
	if (!this.gameOver) {
		if (this.restartScreen.on) {
			this.restartScreen.handleInput(delta);
		} else {
			this.grid.handleInput(delta);
			this.figurePanel.handleInput(delta);
			
			// this.buttonMenu.handleInput(delta);
			this.buttonSound.handleInput(delta);
			
			this.buttonRestart.handleInput(delta);
			this.titleScreen.handleInput(delta);
			// /*this.settingsScreen.handleInput(delta);*/
		}
			
	}
	else {
		if (Touch.isTouchDevice) {
			if (Touch.isTouching) 
				this.reset();
		} else {
			if (Mouse.left.down) 
				this.reset();
		}
	}
};

tentenGameWorld.prototype.update = function (delta) {
	this.titleScreen.update(delta);
	/*this.settingsScreen.update(delta);*/
	this.restartScreen.update(delta);
	
	// this.buttonMenu.update(delta);
	this.buttonSound.update(delta);
	
	this.buttonRestart.update(delta);
	this.grid.update(delta);
	this.figurePanel.update(delta);
	if (this.highScore < this.score) 
		this.writeHighScore();
};

tentenGameWorld.prototype.draw = function () {
	
	
	Canvas2D.clear();
	Canvas2D.drawImage(images.bg, new Vector2(), new Vector2());
	Canvas2D.drawText('Highscore: ' + this.highScore, 
					  new Vector2(288, 20), "center", 30, this.fontType)
						  
	if (this.score > 0)	{
		Canvas2D.drawText(this.score, {x : 576 / 2, y : Game.gameWorld.grid.position.y /2}, 
						  "center", 50, this.fontType);
	}			  
	this.grid.draw();
	this.figurePanel.draw();
	
	// this.buttonMenu.draw();
	this.buttonSound.draw();
	
	this.buttonRestart.draw();
	this.titleScreen.draw();
	// /*this.settingsScreen.draw();*/
	this.restartScreen.draw();
	
	if (this.gameOver) {
		Canvas2D.drawImage(images.gameOver, new Vector2(), new Vector2());
		Canvas2D.drawText('Game Over', {x : 576 / 2, y : 442.5}, 
						  "center", 80, this.fontType);
	}
	
};

tentenGameWorld.prototype.reset = function () {
	this.grid.reset();
	this.figurePanel.reset();
	this.score = 0;
	this.gameOver = false;
};

tentenGameWorld.prototype.addScore = function (object) {
	var count = 0;
	for (var i = 0; i < object.length; i ++) {
		for (var j = 0; j < object[i].length; j ++) {
			if (object[i][j] !== 0)
				count ++;
		}
	}
	this.score += count;
};

tentenGameWorld.prototype.addBonusScore = function (factor, crossing) {
	var cross = typeof crossing !== 'undefined' ? crossing : 1;
	this.score += (factor * factor * 10 * cross);
};
