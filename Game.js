"use strict";

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               function (callback) {
									window.setTimeout(callback, 1000 / 60);
                               };

function Game_Singleton () {
	this.size = null;
	this.gameWorld = null;
	this._spritesStillLoading = 0;
};

Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
	this.size = new Vector2(x, y);
	Canvas2D.initialize(divName, canvasName);
	this.loadAssets();
	this.assetLoadingLoop();
};

Game_Singleton.prototype.initialize = function () {
};

Game_Singleton.prototype.loadAssets = function () {
};

Game_Singleton.prototype.loadSprite = function (imageName) {
	// console.log("Loading sprite: " + imageName);
	var image = new Image();
	image.src = imageName;
	this._spritesStillLoading += 1;
	image.onload = function () {
		Game._spritesStillLoading -= 1;
	};
	return image;
}

Game_Singleton.prototype.loadImage = function (imageName) {
	var image = new Image();
	image = imageName;
	return image;
};

Game_Singleton.prototype.assetLoadingLoop = function () {
	if (Game._spritesStillLoading > 0) {
		requestAnimationFrame(Game.assetLoadingLoop);
	} else {
		Game.initialize();
		window.requestAnimationFrame(Game.loop)
	}
};

Game_Singleton.prototype.loop = function () {
	var delta = 1 / 60;
	Game.gameWorld.handleInput(delta);
	Game.gameWorld.update(delta);
	Game.gameWorld.draw();
	window.requestAnimationFrame(Game.loop)
	// setTimeout(Game.loop, 1000 / 60)
};

var Game = new Game_Singleton();
