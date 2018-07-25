"use strict";

function handleMouseMove (evt) {
	var canvasScale = Canvas2D.scale;
	var canvasOffset = Canvas2D.offset;
	Mouse._position = {x : (evt.pageX - canvasOffset.x) / canvasScale.x, 
					  y : (evt.pageY - canvasOffset.y) / canvasScale.y};
}

function handleMouseDown (evt) {
	if (evt.which === 1){
		if (!Mouse._left.down)
			Mouse._left.pressed = true;
		Mouse._left.down = true;
	} else if (evt.which === 2){
		if (!Mouse._middle.down)
			Mouse._middle.pressed = true;
		Mouse._middle.down = true;
	} else if (evt.which === 3){
		if (!Mouse._right.down)
			Mouse._right.pressed = true;
		Mouse._right.down = true;
	}
}


function handleMouseUp (evt) {
	if (evt.which === 1) {
		Mouse._left.down = false;
	} else if (evt.which === 2) {
		Mouse._middle.down = false;
	} else if (evt.which === 3) {
		Mouse._right.down = false;
	}
}

function Mouse_Singleton() {
	this._position = new Vector2();
	this._left = new ButtonState();
	this._middle = new ButtonState();
	this._right = new ButtonState();
	document.onmousemove = handleMouseMove;
	document.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
} 

Object.defineProperty(Mouse_Singleton.prototype, "left", 
{
	get: function () {
		return this._left;
	}
});

Object.defineProperty(Mouse_Singleton.prototype, "middle", 
{
	get: function () {
		return this._middle;
	}
});

Object.defineProperty(Mouse_Singleton.prototype, "right", 
{
	get: function () {
		return this._right;
	}
});

Object.defineProperty(Mouse_Singleton.prototype, "position", 
{
	get: function () {
		return this._position;
	}
});

Mouse_Singleton.prototype.click = function (rectangle) {
	
}

Mouse_Singleton.prototype.inside = function (object) {
	if (object.position.x === object.origin.x &&
		object.position.y === object.origin.y) {
			return(object.position.x < Mouse.position.x && 
				   object.position.y < Mouse.position.y && 
				   object.figureImage.width > Mouse.position.x &&
				   object.figureImage.height > Mouse.position.y)
	} else {
		// objects with shifted origin
		if(object.draggingOffset === undefined) {
			object.draggingOffset = new Vector2(0, 0);
		}
		object.draggingOffset.x = object.position.x - Mouse.position.x;
		object.draggingOffset.y = object.position.y - Mouse.position.y;
		if (Math.abs(object.draggingOffset.x) < object.figureImage.width / 2 &&
			(Math.abs(object.draggingOffset.y) < object.figureImage.height / 2)) {
			return true;
		} else 
			return false;
	}
};

Mouse_Singleton.prototype.reset = function () {
	this._left.pressed = false;
	this._middle.pressed = false;
	this._right.pressed = false;
}

var Mouse = new Mouse_Singleton();