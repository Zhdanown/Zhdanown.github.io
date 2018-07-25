"use strict";

function settingsScreen () {
	Screen.call(this, images.bg);
	this.visible = false;
	this.on = false;
	// this.buttonStart = new buttonStart(new Vector2(0, 0));
	// this.buttonSettings = new buttonSettings(new Vector2(0, 0));
}

settingsScreen.prototype = Object.create(Screen.prototype);

settingsScreen.prototype.handleButtons = function () {
	// this.buttonStart.handleInput();
	// this.buttonSettings.handleInput();
}

// settingsScreen.prototype.buttonUpdate = function () {
		
	// this.updBtnPos(this.buttonStart, {x : 288, y : 500});
	// this.updBtnPos(this.buttonSettings, {x : 288, y : 800});
	
	// this.buttonStart.update();
	// this.buttonSettings.update();
// }


settingsScreen.prototype.drawButtons = function () {
	// this.buttonStart.draw();
	// this.buttonSettings.draw();
}

