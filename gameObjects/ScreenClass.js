"use strict";

function Screen (image) {
	this.position = new Vector2(0, 0);
	this.origin = new Vector2(0, 0);
	this.figureImage = image;
	this.visible = false;
	this.on = false;
}

Screen.prototype.handleInput = function (delta) {
	if (this.visible) {
		if (Touch.isTouchDevice) {
			this.handleTouchInput();
		} else {
			this.handleMouseInput();
		}
	}
};

Screen.prototype.handleMouseInput = function (delta) {
	if (this.on) {
		this.handleButtons(); 
		
		// if (Mouse.left.down && Mouse.inside(this)) {
			// this.on = false;
		// }
	}
};

Screen.prototype.handleTouchInput = function (delta) {
	if (this.on) {
		this.handleButtons();
	}
};

Screen.prototype.handleButtons = function (delta) {
};

Screen.prototype.slideToggle = function (delta) {
	if (!this.on && this.position.y != 1024) {
		this.position.y += 64;
		if (this.position.y === 1024)
			this.visible = false;
	}
	
	if (this.on && this.position.y != 0) {
		if (!this.visible) 
			this.visible = true;
		this.position.y -= 64;
	}
};

// Screen.prototype.slideDown = function (delta) {
	// this.position.y += 64;
	// if (this.position.y === 1024)
		// this.visible = false;
// };

// Screen.prototype.slideUp = function (delta) {
	// if (!this.visible) 
		// this.visible = true;
	// this.position.y -= 64;	
// };

Screen.prototype.update = function (delta) {
	this.buttonUpdate();
	
	this.slideToggle();
	
	// if (!this.on && this.position.y != 1024)
		// this.slideDown();
	
	// if (this.on && this.position.y != 0)
		// this.slideUp();
};

Screen.prototype.buttonUpdate = function (delta) {
};

Screen.prototype.updBtnPos = function (button, position) {
	button.position.x = this.position.x + position.x;
	button.position.y = this.position.y + position.y;
};

Screen.prototype.draw = function () {
	if (!this.visible)
		return;
	Canvas2D.drawImage(this.figureImage, this.position, this.origin);
	this.drawButtons();
};

