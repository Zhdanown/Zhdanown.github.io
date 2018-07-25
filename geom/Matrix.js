"use strict";

function Matrix () {
	
}

Matrix.prototype.getStartCell = function () {
	var figurePosition = Game.gameWorld.activeFigure.position.copy(),
		insertPoint = Game.gameWorld.activeFigure.insertPoint,
		gridPosition = Game.gameWorld.grid.position,
		gridDimensions = Game.gameWorld.grid.size.copy();
		
	var startCell =  figurePosition.subtractFrom(insertPoint).
									subtractFrom(gridPosition);
		startCell.divideBy( gridDimensions.divideBy(10) );
		
	var col = Math.ceil(startCell.x),
		row = Math.ceil(startCell.y);
	
	return {col : col - 1, row : row - 1};		
};


Matrix.prototype.copy = function (array) {
	var result = [];
	for (var i = 0; i < array.length; i ++) {
		result[i] = array[i].slice();
	}
	return result;
};

Matrix.prototype.insert = function () {
	
};

Matrix.prototype.checkFullRows = function (array) {
	var FullRows = [];
	for (var row = 0; row < array.length; row ++) {
		var count = 0;
		for (var i = 0; i < array[row].length; i ++) {
			if (array[row][i] !== 0) 
				count ++;
		}
		if (count === 10) 
			FullRows.push(row)
	}
	if (FullRows.length === 0)
		return false;
	else 
		return FullRows;
	
};

Matrix.prototype.checkFullCols = function (array) {
	var FullCols = [];
	for (var col = 0; col < array.length; col ++) {
		var count = 0;
		for (var row = 0; row < array.length; row ++) {
			if (array[row][col] !== 0)
					count ++;
		}
		if (count === 10)
			FullCols.push(col);
	}
	if (FullCols.length === 0)
		return false;
	else 
		return FullCols;
		
};

Matrix.prototype.clearRows = function (Rows) {
	var array = Game.gameWorld.grid.map;
	for (var i = 0; i < Rows.length; i ++) {
		for (var j = 0; j < array[Rows[i]].length; j ++) {
			array[Rows[i]][j] = 0;
		}
	}
};

Matrix.prototype.clearCols = function (Cols) {
	var array = Game.gameWorld.grid.map;
	for (var i = 0; i < Cols.length; i ++) {
		for (var j = 0; j < array.length; j ++) {
			array[j][Cols[i]] = 0;
		}
	}
};

var Matrix = new Matrix();

