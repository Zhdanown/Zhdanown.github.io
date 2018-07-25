"use strict";

function Unit (image) {
	this.image = image;
	this.scaleFactor = 1;
}

function Figure () {
	this.origin = this.size.multiply(0.5);
	this.insertPoint = this.origin.copy().subtractFrom(25);
	this.visible = true;
	this.dragging = false;
	this.draggingOffset = new Vector2();
	this.scaleFactor = 0.6;
	this.shrinked = false;
	this.opacity = 1;
	
	for (var i = 0; i < this.map.length; i ++) {
		for (var j = 0; j < this.map[0].length; j ++) {
			if (this.map[i][j] !== 0)
				this.map[i][j] = new Unit(this.image);
		}
	}
}

Object.defineProperty(Figure.prototype, "size", 
	{
		get: function () {
			var x = this.map[0].length,
				y = this.map.length;
			return new Vector2(x * 50 + (x - 1) * 5, 
							   y * 50 + (y - 1) * 5);
		}
	});

Figure.prototype.handleInput = function (delta) {
	if (Touch.isTouchDevice) {
		this.handleTouchInput(delta);
	} else {
		this.handleMouseInput(delta);
	}
};	
	
Figure.prototype.handleMouseInput = function (delta) {
	if (Mouse.left.down) {
		var rect = new Rectangle(this.position.x - this.origin.x,
								this.position.y - this.origin.y,
								this.size.x, this.size.y);
		
		if (this.dragging) {
			this.position.x = Mouse.position.x + this.draggingOffset.x;
			this.position.y = Mouse.position.y + this.draggingOffset.y;
			
		} else if (rect.contains(Mouse.position) && this.visible && 
				   Game.gameWorld.activeFigure === false) {
			this.dragging = true;
			Game.gameWorld.activeFigure = this;
			this.scaleFactor = 1;
			
			this.draggingOffset.x = this.position.x - Mouse.position.x;
			this.draggingOffset.y = this.position.y - Mouse.position.y;
		}
	} else {
		this.dragging = false;
		Game.gameWorld.activeFigure = false;
		// this.scaleFactor = 0.6;
	}	
};

Figure.prototype.handleTouchInput = function (delta) {
	if (Touch.isPressing) {
		if (this.dragging) {
			this.position.x = Touch.getPosition(0).x;
			this.position.y = Touch.getPosition(0).y - 130;
		} else if (Touch.inside(this) && this.visible && 
				   Game.gameWorld.activeFigure === false) {
			this.dragging = true;
			Game.gameWorld.activeFigure = this;
			this.scaleFactor = 1;
		}
	
	} else {
		this.dragging = false;
		Game.gameWorld.activeFigure = false;
		// this.scaleFactor = 0.6;
	}
};


Figure.prototype.dissolve = function () {
	this.flag = true;
	this.scaleFactor += 0.1;
	this.opacity -= 0.1;
	
	if (this.opacity <= 0.1) {
		this.flag = false;
		this.scaleFactor = 0;
		Game.gameWorld.figurePanel.resetFigurePosition(this);
	}
}; 

Figure.prototype.appear = function () {
	this.shrinked = true;
	this.scaleFactor += 0.07;
	this.opacity = 1;
	if (this.scaleFactor >= 0.5) {
		this.shrinked = false;
		this.scaleFactor = 0.6;
	}
}

Figure.prototype.update = function (delta) {
	if (this.flag) {
		this.dissolve();
	}
	if (this.shrinked) {
		this.appear();
	} 
};

Figure.prototype.draw = function (delta) {
	if (!this.visible)
		return;
	
	for (var i = 0; i < this.map.length; i ++) {
		for (var j = 0; j < this.map[0].length; j ++) {
			if (this.map[i][j] == 0)
				continue;
				var shift = new Vector2(j * 55 * this.scaleFactor, i * 55 * this.scaleFactor),
					image = this.map[i][j].image,
					position = this.position.copy().addTo(shift);
				Canvas2D.drawImage(image, position, this.origin, this.scaleFactor, this.opacity);
		}
	}
};
