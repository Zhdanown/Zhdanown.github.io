"use strict";

function Dot(position) {
	this.position = position;
	this.image = images.dot;
	this.map = [[1]];
	Figure.call(this);
}

Dot.prototype = Object.create(Figure.prototype);

//--------------------------------------------------------------------

function Square(position) {
	this.position = position;
	this.image = images.square;
	this.map = [[1,1],
				[1,1]];
	Figure.call(this);
}

Square.prototype = Object.create(Figure.prototype);


function BigSquare(position) {
	this.position = position;
	this.image = images.square;
	this.map = [[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1]];
	Figure.call(this);			
}

BigSquare.prototype = Object.create(Figure.prototype);

//--------------------------------------------------------------------

function HLine2(position) {
	this.position = position;
	this.image = images.line2;
	this.map = [[1, 1]];
	Figure.call(this);
}

HLine2.prototype = Object.create(Figure.prototype);

function HLine3(position) {
	this.position = position;
	this.image = images.line3;
	this.map = [[1, 1, 1]];
	Figure.call(this);
}

HLine3.prototype = Object.create(Figure.prototype);

function HLine4(position) {
	this.position = position;
	this.image = images.line4;
	this.map = [[1, 1, 1, 1]];
	Figure.call(this);
}

HLine4.prototype = Object.create(Figure.prototype);

function HLine5(position) {
	this.position = position;
	this.image = images.line5;
	this.map = [[1, 1, 1, 1, 1]];
	Figure.call(this);
}

HLine5.prototype = Object.create(Figure.prototype);

//---------------------------------------------------------------------

function VLine2(position) {
	this.position = position;
	this.image = images.line2;
	this.map = [[1], 
				[1]];
	Figure.call(this);
}

VLine2.prototype = Object.create(Figure.prototype);

function VLine3(position) {
	this.position = position;
	this.image = images.line3;
	this.map = [[1], 
				[1],
				[1]];
	Figure.call(this);
}

VLine3.prototype = Object.create(Figure.prototype);

function VLine4(position) {
	this.position = position;
	this.image = images.line4;
	this.map = [[1], 
				[1],
				[1],
				[1]];
	Figure.call(this);
}

VLine4.prototype = Object.create(Figure.prototype);

function VLine5(position) {
	this.position = position;
	this.image = images.line5;
	this.map = [[1], 
				[1],
				[1],
				[1],
				[1]];
	Figure.call(this);
}

VLine5.prototype = Object.create(Figure.prototype);

//----------------------------------------------------

function Angle1(position) {
	this.position = position;
	this.image = images.angle;
	this.map = [[1, 0],
				[1, 1]];
	Figure.call(this);
}

Angle1.prototype = Object.create(Figure.prototype);

function Angle2(position) {
	this.position = position;
	this.image = images.angle;
	this.map = [[0, 1],
				[1, 1]];
	Figure.call(this);
}

Angle2.prototype = Object.create(Figure.prototype);

function Angle3(position) {
	this.position = position;
	this.image = images.angle;
	this.map = [[1, 1],
				[0, 1]];
	Figure.call(this);
}

Angle3.prototype = Object.create(Figure.prototype);

function Angle4(position) {
	this.position = position;
	this.image = images.angle;
	this.map = [[1, 1],
				[1, 0]];
	Figure.call(this);
}

Angle4.prototype = Object.create(Figure.prototype);

//-------------------------------------------------------


function BigAngle1(position) {
	this.position = position;
	this.image = images.bigAngle;
	this.map = [[1, 0, 0],
				[1, 0, 0],
				[1, 1, 1]];
	Figure.call(this);
}

BigAngle1.prototype = Object.create(Figure.prototype);

function BigAngle2(position) {
	this.position = position;
	this.image = images.bigAngle;
	this.map = [[0, 0, 1],
				[0, 0, 1],
				[1, 1, 1]];
	Figure.call(this);
}

BigAngle2.prototype = Object.create(Figure.prototype);

function BigAngle3(position) {
	this.position = position;
	this.image = images.bigAngle;
	this.map = [[1, 1, 1],
				[0, 0, 1],
				[0, 0, 1]];
	Figure.call(this);
}

BigAngle3.prototype = Object.create(Figure.prototype);

function BigAngle4(position) {
	this.position = position;
	this.image = images.bigAngle;
	this.map = [[1, 1, 1],
				[1, 0, 0],
				[1, 0, 0]];
	Figure.call(this);
}

BigAngle4.prototype = Object.create(Figure.prototype);









