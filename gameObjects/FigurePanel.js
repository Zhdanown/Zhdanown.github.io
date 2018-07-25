"use strict";

function figurePanel() {
	this.position = new Vector2(15.5, 770);
	this.origin = new Vector2();
	this.size = new Vector2(images.figurePanel.width, images.figurePanel.height);
	this.numberOfFigures = 3;
	this.spawnFigures();
}

figurePanel.prototype.handleInput = function (delta) {
	this.fig1.handleInput(delta);
	this.fig2.handleInput(delta);
	this.fig3.handleInput(delta);
};

figurePanel.prototype.removeFigure = function () {
	this.numberOfFigures --;
	Game.gameWorld.grid.checkLines();
	Game.gameWorld.activeFigure.visible = false;
	
	if (this.numberOfFigures === 0) {
		this.spawnFigures();
	}
	if (Game.gameWorld.grid.fullLines.rows ||
		Game.gameWorld.grid.fullLines.cols)
			return;
			
	Game.gameWorld.grid.gameOverCheck();
};

figurePanel.prototype.spawnFigures = function () {
	
	this.fig1_position = new Vector2(this.size.x / 16 * 3 + this.position.x, 
									 this.size.y / 2 + this.position.y);
	this.fig2_position = new Vector2(this.size.x / 2 + this.position.x, 
									 this.size.y / 2 + this.position.y);
	this.fig3_position = new Vector2(this.size.x / 16 * 13 + this.position.x, 
									 this.size.y / 2 + this.position.y);
	
	// this.fig1 = new Square(this.fig1_position);
	this.fig1 = this.getRandomFigure(this.fig1_position);
	// this.fig2 = new Square(this.fig2_position);
	this.fig2 = this.getRandomFigure(this.fig2_position);
	// this.fig3 = new Square(this.fig3_position);
	this.fig3 = this.getRandomFigure(this.fig3_position);
	
	var figuresArray = [
		this.fig1,
		this.fig2,
		this.fig3
	];
	
	for (var index = figuresArray.length - 1; index >= 0; --index) {
		figuresArray[index].scaleFactor = 0;
		figuresArray[index].appear();
	}
		
	this.numberOfFigures = 3;
};

figurePanel.prototype.getRandomFigure = function (position) {
	var randomval = Math.floor(Math.random() * 19);
		
	if (randomval == 0) {
		return  new Dot(position);
	} else if (randomval == 1) {
		return  new Square(position);
	} else if (randomval == 2){
		return  new BigSquare(position);
	} else if (randomval == 3){
		return  new HLine2(position);
	} else if (randomval == 4){
		return  new HLine3(position);
	} else if (randomval == 5){
		return  new HLine4(position);
	} else if (randomval == 6){
		return  new HLine5(position);
	} else if (randomval == 7){
		return  new VLine2(position);
	} else if (randomval == 8){
		return  new VLine3(position);
	} else if (randomval == 9){
		return  new VLine4(position);
	} else if (randomval == 10){
		return  new VLine2(position);
	} else if (randomval == 11){
		return  new Angle1(position);
	} else if (randomval == 12){
		return  new Angle2(position);
	} else if (randomval == 13){
		return  new Angle3(position);
	} else if (randomval == 14){
		return  new Angle4(position);
	} else if (randomval == 15){
		return  new BigAngle1(position);
	} else if (randomval == 16){
		return  new BigAngle2(position);
	} else if (randomval == 17){
		return  new BigAngle3(position);
	} else if (randomval == 18){
		return  new BigAngle4(position);
	}
	
};

figurePanel.prototype.resetFigure = function (figure) {
	var response = figure.dissolve();
};

figurePanel.prototype.resetFigurePosition = function (figure) {
	if (figure === this.fig1) {
		figure.position = new Vector2(this.size.x / 16 * 3 + this.position.x, 
									  this.size.y / 2 + this.position.y);
	}
	else if (figure === this.fig2) {
		figure.position = new Vector2(this.size.x / 2 + this.position.x, 
									  this.size.y / 2 + this.position.y);
	} 
	else if (figure === this.fig3) {
		figure.position = new Vector2(this.size.x / 16 * 13 + this.position.x, 
									  this.size.y / 2 + this.position.y);
	}
	figure.appear();
}


figurePanel.prototype.update = function (delta) {
	this.fig1.update(delta);
	this.fig2.update(delta);
	this.fig3.update(delta);
};

figurePanel.prototype.draw = function () {
	Canvas2D.drawImage(images.figurePanel, this.position, this.origin);
	this.fig1.draw();
	this.fig2.draw();
	this.fig3.draw();
};

figurePanel.prototype.reset = function () {
	this.spawnFigures();
};
