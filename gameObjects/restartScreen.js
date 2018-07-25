"use strict";

function restartScreen () {
	Screen.call(this, images.gameOver);
	// this.position = new Vector2(0, 0);
	// this.figureImage = images.gameOver;
	// this.origin = new Vector2(0, 0);
	// this.visible = false;
	// this.on = false;
	
	this.buttonConfirm = new buttonConfirm(new Vector2(206, 512));
	this.buttonCancel = new buttonCancel(new Vector2(370, 512));
}

restartScreen.prototype.handleInput = function (delta) {
	if (this.visible) {
		if (Touch.isTouchDevice) {
			this.handleTouchInput();
		} else {
			this.handleMouseInput();
		}
	}
};

restartScreen.prototype.handleMouseInput = function (delta) {
	this.buttonConfirm.handleInput();
	this.buttonCancel.handleInput();
		
	// if (Mouse.left.down && Mouse.inside(this)) {
		// this.on = false;
	// }
};

restartScreen.prototype.handleTouchInput = function (delta) {
	this.buttonConfirm.handleInput();
	this.buttonCancel.handleInput();
};

restartScreen.prototype.appear = function (delta) {
	this.opacity = 1;
	this.visible = true;
	
};

restartScreen.prototype.update = function (delta) {
	this.buttonConfirm.update();
	this.buttonCancel.update();
	
	if (this.on) {
		this.buttonConfirm.showUp = true;
		this.buttonCancel.showUp = true;
		
		this.visible = true;
	} else {
		this.buttonConfirm.remove = true;
		this.buttonCancel.remove = true;
		
		this.visible = false;
	}
};

restartScreen.prototype.draw = function () {
	if (!this.visible)
		return;
	Canvas2D.drawImage(this.figureImage, this.position, this.origin, 1, this.opacity);
	// Canvas2D.drawText('Are you sure you want to', new Vector2(288, 350), "center", 40, Game.gameWorld.fontType);
	Canvas2D.drawText('Restart this game?', new Vector2(288, 400), "center", 40, Game.gameWorld.fontType);
	
	this.buttonConfirm.draw();
	this.buttonCancel.draw();
};
