"use strict";

function Canvas2D_Singleton() {
	this.canvas = undefined;
	this.canvasContext = undefined;
	this._canvasOffset = new Vector2();
};

Object.defineProperty(Canvas2D_Singleton.prototype, "offset", 
{
	get: function () {
		return this._canvasOffset;
	}
});

Object.defineProperty(Canvas2D_Singleton.prototype, "scale", 
{
	get: function () {
		return new Vector2(this.canvas.width / Game.size.x,
						   this.canvas.height / Game.size.y);
	}
});

Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
	this.canvas = document.getElementById(canvasName);
	this.canvasContext = this.canvas.getContext('2d');
	this._div = document.getElementById(divName);
	window.onresize = Canvas2D_Singleton.prototype.resize;
	this.resize();
};

Canvas2D_Singleton.prototype.clear = function () {
	this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
};

Canvas2D_Singleton.prototype.resize = function () {
	var gameCanvas = Canvas2D.canvas;
	var gameArea = Canvas2D._div;
	var widthToHeight = Game.size.x / Game.size.y;
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newWidthToHeight = newWidth / newHeight;
	if (newWidthToHeight > widthToHeight) {
		newWidth = newHeight * widthToHeight;
	} else {
		newHeight = newWidth / widthToHeight;
	}
	gameArea.style.width = newWidth + 'px';
	gameArea.style.height = newHeight + 'px';
	gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
	gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
	gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
	gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
	
	gameCanvas.width = newWidth;
	gameCanvas.height = newHeight;
	
	var offset = new Vector2();
	if (gameCanvas.offsetParent) {
		do {
			offset.x += gameCanvas.offsetLeft;
			offset.y += gameCanvas.offsetTop;
		} while (gameCanvas = gameCanvas.offsetParent);
	}
	Canvas2D._canvasOffset = offset;
};

Canvas2D_Singleton.prototype.drawImage = function (image, position, origin, scale, opacity) {
	var canvasScale = this.scale;
	
	this.canvasContext.save();
	this.canvasContext.scale(canvasScale.x, canvasScale.y);
	this.canvasContext.translate(position.x, position.y);
	this.canvasContext.scale(scale, scale);
	this.canvasContext.globalAlpha = opacity;
	this.canvasContext.drawImage(image, 0, 0, 
									image.width, image.height, 
									-origin.x, -origin.y, 
									image.width, image.height);
	this.canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function (text, position, textAlign, fontSize, fontType) {
	var canvasScale = this.scale;
	
	this.canvasContext.save();
	this.canvasContext.scale(canvasScale.x, canvasScale.y);
	this.canvasContext.translate(position.x, position.y);
	this.canvasContext.textBaseline = "middle";
	this.canvasContext.font = fontSize + "px " + fontType;
	this.canvasContext.fillStyle = "#333";
	this.canvasContext.textAlign = textAlign;
	this.canvasContext.fillText(text, 0, 0);
	this.canvasContext.restore();
	
};

var Canvas2D = new Canvas2D_Singleton();