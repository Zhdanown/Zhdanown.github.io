"use strict";

function AnimatedButton (image) {
	Button.call(this, image);
	this.position = undefined;
	this.scaleFactor = 0;
	this.showUp = false;
	this.hide = false;
	this.showed = false;
	this.removed = false;
}

AnimatedButton.prototype = Object.create(Button.prototype);

AnimatedButton.prototype.appear = function (delta) {
	this.scaleFactor += 0.1;
	if(this.scaleFactor >= 0.9) {
		this.scaleFactor = 1;
		this.showed = true;
	}
};

AnimatedButton.prototype.remove = function (delta) {
	console.log(this.showUp);
	console.log(this.showed);
	
}

AnimatedButton.prototype.update = function (delta) {
	if (this.showUp && !this.showed) {
		this.appear();
	}
	if (this.hide && !this.removed) {
		this.remove();
	}
};

AnimatedButton.prototype.draw = function (delta) {
	if (!this.visible)
		return;
	Canvas2D.drawImage(this.image, this.position, this.origin, this.scaleFactor);
};