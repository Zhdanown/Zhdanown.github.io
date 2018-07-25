"use strict";

var images = {};
var sprites = {};
var sounds = {};

Game.loadAssets = function () {
	var loadSprite = function (sprite) {
		return Game.loadSprite("assets/" + sprite);
	};
	
	var loadImage = function (image) {
		return Game.loadImage(image);
	};
	
	var loadSound = function (sound) {
		return new Sound("assets/" + sound);
	}
	
	sprites.menu_icon = loadSprite("menu_icon.png");
	sprites.start_icon = loadSprite("start_icon.png");
	sprites.restart_icon = loadSprite("restart_icon.png");
	sprites.confirm_icon = loadSprite("confirm_icon.png");
	sprites.cancel_icon = loadSprite("cancel_icon.png");
	sprites.settings_icon = loadSprite("settings_icon.png");
	sprites.quit_icon = loadSprite("quit_icon.png");
	sprites.soundOn_icon = loadSprite("soundOn_icon.png");
	sprites.soundOff_icon = loadSprite("soundOff_icon.png");
	
	
	images.titleScreen = loadImage(Img.drawTitleScreen());
	images.bg = loadImage(Img.drawBackground());
	images.grid = loadImage(Img.drawGrid());
	images.figurePanel = loadImage(Img.drawFigurePanel());
	
	images.dot = loadImage(Img.drawUnit("#000033"));
	images.square = loadImage(Img.drawUnit("#003399"));
	images.bigSquare = loadImage(Img.drawUnit("#3399cc"));
	images.line2 = loadImage(Img.drawUnit("#660000"));
	images.line3 = loadImage(Img.drawUnit("#cc3300"));
	images.line4 = loadImage(Img.drawUnit("#ff9900"));
	images.line5 = loadImage(Img.drawUnit("#ffcc00"));
	images.angle = loadImage(Img.drawUnit("#003300"));
	images.bigAngle = loadImage(Img.drawUnit("#339900"));
	
		// images.restart = loadImage(Img.drawRestartScreen());
	images.gameOver = loadImage(Img.drawGameOver());
	
	sounds.pop = loadSound("pop");
};

Game.initialize = function () {
	Game.gameWorld = new tentenGameWorld();
	// Game.gameWorld = new myGameWorld();
}

