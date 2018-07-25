"use strict";

function titleScreen () {
	Screen.call(this, images.titleScreen);
	this.visible = true;
	this.on = true;
	this.buttonStart = new buttonStart(new Vector2(0, 0));
	// this.buttonSettings = new buttonSettings(new Vector2(0, 0));
	// this.buttonQuit = new buttonQuit(new Vector2(0, 0));
	// this.buttonSound = new buttonSound(new Vector2(0, 0));
}

titleScreen.prototype = Object.create(Screen.prototype);

titleScreen.prototype.handleButtons = function () {
	this.buttonStart.handleInput();
	// this.buttonSettings.handleInput();
	// this.buttonQuit.handleInput();
	// this.buttonSound.handleInput();
}

titleScreen.prototype.buttonUpdate = function () {
		
	this.updBtnPos(this.buttonStart, {x : 288, y : 500});
	// this.updBtnPos(this.buttonSettings, {x : 212, y : 652});
	// this.updBtnPos(this.buttonQuit, {x : 364, y : 652});
	// this.updBtnPos(this.buttonSound, {x : 288, y : 652});
	
	this.buttonStart.update();
	// this.buttonSettings.update();
	// this.buttonQuit.update();
	// this.buttonSound.update();
}

titleScreen.prototype.drawButtons = function () {
	this.buttonStart.draw();
	// this.buttonSettings.draw();
	// this.buttonQuit.draw();
	// this.buttonSound.draw();
}



