"use strict";

function getBuffer (width, height) {
	var buffer = document.createElement("canvas");
	buffer.width = width;
	buffer.height = height;
	return buffer;
}

function drawRoundRect (width, height, radius, color) {
	var w_r = width - radius,
		h_r = height - radius,
		buffer = getBuffer(width, height);
	buffer.context = buffer.getContext("2d");
	
	buffer.context.lineTo(w_r, 0);
	buffer.context.arcTo(width, 0, width, radius, radius);
	buffer.context.lineTo(width, h_r);
	buffer.context.arcTo(width, height, w_r, height, radius);
	buffer.context.lineTo(radius, height);
	buffer.context.arcTo(0, height, 0, h_r, radius);
	buffer.context.lineTo(0, radius);
	buffer.context.arcTo(0, 0, radius, 0, radius);
	buffer.context.fillStyle = color;
	buffer.context.fill();
	
	return buffer;
};

function drawRoundSquare(color) {
	return drawRoundRect(Img.cellSize, Img.cellSize, Img.cellSize / 10, color);
};

var Img = {
	cellSize : 50,
	width : 350,
	bgColor : "#dddddd"
};

Img.drawTitleScreen = function () {
	var width = 576,
		height = 1024;
	var buffer = getBuffer(width, height);
	buffer.context = buffer.getContext("2d");
	
	buffer.context.fillStyle = Img.bgColor;
	buffer.context.fillRect(0, 0, width, height);
	
	var originX = 55,
		originY = 55*3;
		
	// buffer.context.drawImage(Img.drawSquare(), 0, 0);
	// buffer.context.drawImage(Img.drawHorizontalLine(2), 55*2, 0);
	// buffer.context.drawImage(Img.drawVerticalLine(4), 0, 55*2);
	
	// buffer.context.drawImage(Img.drawBigAngle(3), 55*7 + 31, 0);
	// buffer.context.drawImage(Img.drawAngle(1), 55*6 + 31, 0);
	
	// buffer.context.drawImage(Img.drawBigAngle(1), 0, 55*14 + 39);
	// buffer.context.drawImage(Img.drawHorizontalLine(5), 0, 55*17 + 39);
	
	// buffer.context.drawImage(Img.drawHorizontalLine(2), 55*8 + 31, 55*17 + 39);
	// buffer.context.drawImage(Img.drawVerticalLine(3), 55*9 + 31, 55*14 + 39);
	
	return buffer;
};

Img.drawBackground = function () {
	var width = 576,
		height = 1024;
	var buffer = getBuffer(width, height);
	buffer.context = buffer.getContext("2d");
		
	buffer.context.fillStyle = Img.bgColor;
	buffer.context.fillRect(0, 0, width, height);
	
	return buffer; 
};

Img.drawUnit = function (color) {
	return drawRoundSquare(color);
};

Img.drawGrid = function () {
	var buffer = getBuffer(545, 545);
	buffer.context = buffer.getContext("2d");
	
	for (var column = 0; column < 10; column ++) {
		for (var row = 0; row < 10; row ++) {
			buffer.context.drawImage(drawRoundSquare("white"), 
						  column * (55), 
						  row * (55));
		}
	}
	return buffer;
};

Img.drawFigurePanel = function () {
	var buffer = getBuffer(545, 200);
	buffer.context = buffer.getContext("2d");
	
	buffer.context.drawImage(drawRoundRect(buffer.width, buffer.height, 5, "white"),
							 0, 0);
	return buffer;
};

Img.drawGameOver = function () {
	var width = 576,
		height = 1024,
		buffer = getBuffer(width, height);
	buffer.context = buffer.getContext("2d");
	
	buffer.context.globalAlpha = 0.7;
	buffer.context.fillStyle = Img.bgColor;
	buffer.context.fillRect(0, 0, width, height);
	
	return buffer;
};