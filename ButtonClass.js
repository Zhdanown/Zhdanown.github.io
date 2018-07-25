"use strict";

function Button (image) {
	this.image = image;
	this.position = undefined;
	this.origin = new Vector2(image.width / 2, image.height / 2);
	this.visible = true;
	this.pressed = false;
	this.validPress = false;
	// this.lastTouchPosition = undefined;
	
	this.size = new Vector2(image.width, image.height);
}

Button.prototype.handleInput = function (delta) {
	if (Touch.isTouchDevice) 
		this.handleTouchInput();
	else 
		this.handleMouseInput();
	
};

Button.prototype.handleMouseInput = function (delta) {
	var rect = new Rectangle(this.position.x - this.origin.x,
								this.position.y - this.origin.y,
								this.size.x, this.size.y);
	
	if (Mouse.left.down) {
		if (!this.pressed) {
			this.pressed = true;
			if (rect.contains(Mouse.position)) {
				this.validPress = true;
			} 
		}
	} else {
		if (rect.contains(Mouse.position)) {
			if (this.validPress) {
				this.validPress = false;
				this.pressed = false;
				this.onPressAction();
			}
		} else {
			this.validPress = false;
		}
		this.pressed = false;
	}
//-------------------------------------------------------
	// if (Mouse.left.down && Mouse.inside(this)) {
		// if (!this.pressed) {
			// this.onPressAction();
		// }
		// this.pressed = true;
	// }
	// if (!Mouse.left.down) {
		// this.pressed = false;
	// }
};

Button.prototype.handleTouchInput = function (delta) {
	if (Touch.isTouching) {
		if (!this.pressed) {
			this.pressed = true;
			if (Touch.inside(this)) {
				this.validPress = true;
			} 
		}
	} else {
		// if(Touch.inside(this)) ?????????????????????
		if (this.validPress) {
			this.validPress = false;
			this.pressed = false
			this.onPressAction();
		}
		this.pressed = false;
	}

	
	/*
	if (Touch.isTouching && Touch.inside(this)) {
		if (!this.pressed) {
			this.onPressAction();
		}
		this.pressed = true;	
	}
	
	if (!Touch.isTouching) {
		this.pressed = false;
	}
	*/
};

Button.prototype.onPressAction = function (delta) {
};

Button.prototype.update = function (delta) {
};

Button.prototype.draw = function (delta) {
	if (!this.visible)
		return;
	Canvas2D.drawImage(this.image, this.position, this.origin);
};
