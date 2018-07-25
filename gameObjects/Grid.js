"use strict";

function mygrid() {
	this.position = new Vector2(15.5, 170);
	this.origin = new Vector2();
	this.Image = images.grid;
	this.size = new Vector2(this.Image.width, this.Image.height);
	this.fullLines = {rows : false, cols : false};
	this.reset();
};

mygrid.prototype.handleInput = function (delta) {
	if (Touch.isTouchDevice) {
		if (!Touch.isPressing && Game.gameWorld.activeFigure) 
			this.putFigureIn();
	} else {
		if (!Mouse.left.down && Game.gameWorld.activeFigure) 
			this.putFigureIn();
	}
};

mygrid.prototype.putFigureIn = function () {
	var rect = new Rectangle(this.position.x, this.position.y,
							 this.size.x, this.size.y),
		figure = Game.gameWorld.activeFigure;
	
	if (rect.contains(figure.position)) {
		var startCell = Matrix.getStartCell();
				
		if (this.updateGridMap(startCell, figure.map)) {
			sounds.pop.play();
			
			Game.gameWorld.figurePanel.removeFigure();
			Game.gameWorld.addScore(figure.map);
		} else {
			Game.gameWorld.figurePanel.resetFigure(figure);
		}
	} else {
		Game.gameWorld.figurePanel.resetFigure(figure);
	}
};

mygrid.prototype.updateGridMap = function (startCell, map) {
	var bufferMap = Matrix.copy(this.map);
	// var lastCoordinates = [];
	
	for (var row = 0; row < map.length; row ++) {
		for (var col = 0; col < map[row].length; col ++) {
			if ((startCell.row + row) < 0 || (startCell.row + row) > 9 ||
				(startCell.col + col) < 0 || (startCell.col + col) > 9) 
				return;
			if (bufferMap[startCell.row + row][startCell.col + col] !== 0 &&
				map[row][col] !== 0)
				return;
			if (map[row][col] !== 0) {
				bufferMap[startCell.row + row][startCell.col + col] = map[row][col];
				// lastCoordinates.push({row: startCell.row + row, col : startCell.col + col});
			}
		}
	}
	this.map = Matrix.copy(bufferMap);
	// Game.gameWorld.lastPosition = lastCoordinates;
	return true;
};
	

mygrid.prototype.checkLines = function () {
	var FullRows = Matrix.checkFullRows(this.map);
	var FullCols = Matrix.checkFullCols(this.map);
	
	if (FullRows) 
		this.fullLines.rows = FullRows;
		// this.clearRows(FullRows);
	if (FullCols) 
		this.fullLines.cols = FullCols;
		// this.clearCols(FullCols);
	
	if (FullRows.length && FullCols.length) {
		Game.gameWorld.addBonusScore(FullRows.length + FullCols.length, 2);
	}
	else {
		if (FullRows.length)
			Game.gameWorld.addBonusScore(FullRows.length);
		if (FullCols.length)
			Game.gameWorld.addBonusScore(FullCols.length);
	}
};

mygrid.prototype.clearLines = function (lines) {
	var arr = [],
		rows = lines.rows,
		cols = lines.cols;
	/*add rows*/
	for (var i = 0; i < rows.length; i ++) {
		for (var j = 0; j < 10; j ++) {
			var cell = {row: rows[i], col: j}
			arr.push(cell);
		}
	}
	/*add cols*/
	for (var i = 0; i < cols.length; i ++) {
		nextcell:
		for (var j = 0; j < 10; j ++) {
			var cell = {row: j, col: cols[i]}
			/*check if cell is already there*/
			for (var index = 0; index < arr.length; index ++) {
				if(arr[index].row === cell.row && 
					arr[index].col === cell.col) {
					continue nextcell;
				}
			}
			arr.push(cell);
		}
	}
	this.clearCells(arr);
	// this.clearRows(lines.rows);
	// this.clearCols(lines.cols);
}

mygrid.prototype.clearCells = function (cells) {
	var array = Game.gameWorld.grid.map,
		count = 0;
	for (var i = 0; i < cells.length; i ++) {
		var cell = cells[i];
		array[cell.row][cell.col].scaleFactor -= 0.1;
		if (array[cell.row][cell.col].scaleFactor <= 0) {
			array[cell.row][cell.col] = 0;
			count ++;
		}
	}
	if (count >= cells.length) {
		this.fullLines = {rows: false, cols : false};
		this.gameOverCheck();
	}
		
};

// mygrid.prototype.clearRows = function (rows) {
	// var array = Game.gameWorld.grid.map,
		// clearedRows = 0;
	// for (var i = 0; i < rows.length; i ++) {
		// var row = rows[i],
			// count = 0;
		// for (var col = 0; col < array[row].length; col ++) {
			/*if (array[row][col] === 0)
				continue*/
			// array[row][col].scaleFactor -= 0.1;
			// if (array[row][col].scaleFactor <= 0) {
				// array[row][col] = 0;
				// count ++;
			// }
		// }
		// if (count >= 10)
			// clearedRows ++;
	// }
	// if (clearedRows >= rows.length) 
		// this.fullLines.rows = false;
// };

// mygrid.prototype.clearCols = function (cols) {
	// var array = Game.gameWorld.grid.map,
		// clearedCols = 0;
	// for (var i = 0; i < cols.length; i ++) {
		// var col = cols[i],
			// count = 0;
		// for (var row = 0; row < array.length; row ++) {
			/*if (array[row][col] === 0)
				continue;*/
			// array[row][col].scaleFactor -= 0.1;
			// if (array[row][col].scaleFactor <= 0) {
				// array[row][col] = 0;
				// count ++;
			// }
		// }
		// if (count >= 10)
			// clearedCols ++;
	// }
	// if (clearedCols >= cols.length)
		// this.fullLines.cols = false;
// };


mygrid.prototype.EachCellCheck = function (bufferMap, startCell, map) {
	for (var row = 0; row < map.length; row ++) {
		for (var col = 0; col < map[row].length; col ++) {
			if ((startCell.row + row) > 9 || (startCell.col + col) > 9  )
				return false;
			if (bufferMap[startCell.row + row][startCell.col + col] !== 0 &&
				map[row][col] !== 0)
				return false;
		}
	}
	return true;
};

mygrid.prototype.gameOverCheck = function () {
	var allNoFit = true,
		figures = [Game.gameWorld.figurePanel.fig1,
				   Game.gameWorld.figurePanel.fig2,
				   Game.gameWorld.figurePanel.fig3];
	
	for (var i = 0; i < 3; i ++) {
		
		if (figures[i].visible === true) {
			var bufferMap = Matrix.copy(this.map),
				map = figures[i].map,
				fit = false;
				
			for (var row = 0; row < bufferMap.length; row ++) {
				for (var col = 0; col < bufferMap[row].length; col ++) {
					var temp = this.EachCellCheck(bufferMap, {col : col, row : row}, map); 
					if(temp)
						fit = true;
				}
			}
			if (fit)
				allNoFit = false;
		}
	}
	if (allNoFit)
		Game.gameWorld.gameOver = true;
}

mygrid.prototype.update = function (delta) {
	if (this.fullLines.rows || this.fullLines.cols) {
		this.clearLines(this.fullLines);
	} 
		
};

mygrid.prototype.draw = function () {
	Canvas2D.drawImage(images.grid, this.position, this.origin);
	
	for (var i = 0; i < 10; i ++) {
		for (var j = 0; j < 10; j ++) {
			if (this.map[i][j] === 0) 
				continue;
				var shift = new Vector2(j * 55, i * 55),
					image = this.map[i][j].image,
					position = this.position.copy().addTo(shift).addTo(25),
					scale = this.map[i][j].scaleFactor;
				Canvas2D.drawImage(image, position, new Vector2(25, 25), scale);
		}
	}
};

mygrid.prototype.reset = function () {
	this.map = ([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		  ]);
};





// function grid() {
	// this.position = new Vector2(15.5, 170);
	// this.origin = new Vector2();
	// this.Image = images.grid;
	// this.dimensions = new Vector2(this.Image.width, this.Image.height);
	// this.reset();
// };

// grid.prototype.handleInput = function (delta) {
	// if (Touch.isTouchDevice) {
		// if (!Touch.isPressing && Game.gameWorld.activeFigure) 
			// this.putFigureIn();
	// } else {
		// if (!Mouse.left.down && Game.gameWorld.activeFigure) 
			// this.putFigureIn();
	// }
// };

// grid.prototype.putFigureIn = function () {
	// if (Game.gameWorld.inRangeOf(this)) {
		// var startCell = Matrix.getStartCell();
				
		// if (this.updateGridMap(startCell, Game.gameWorld.activeFigure.map)) {
			// sounds.pop.play();
			// this.drawFigureOnGrid(startCell);
			// Game.gameWorld.figurePanel.removeFigure();
			// Game.gameWorld.addScore(Game.gameWorld.activeFigure.map);
		// } else {
			// Game.gameWorld.figurePanel.resetFigure(Game.gameWorld.activeFigure);
		// }
	// } else {
		// Game.gameWorld.figurePanel.resetFigure(Game.gameWorld.activeFigure);
	// }
// };

// grid.prototype.updateGridMap = function (startCell, map) {
	// var bufferMap = Matrix.copy(this.map);
	// var lastCoordinates = [];
	// if (map[0][0] === undefined) {
		// for (var col = 0; col < map.length; col ++) {
			// if ((startCell.col + col) < 0 || (startCell.col + col) > 9) 
				// return;
			// if (bufferMap[startCell.row][startCell.col + col] === 1 &&
				// map[col] === 1)
				// return
			// if (map[col] === 1) {
				// bufferMap[startCell.row][startCell.col + col] = map[col];
				// lastCoordinates.push({row: startCell.row, col : startCell.col + col});
			// }
		// }
	// }
	// else {
		// for (var row = 0; row < map.length; row ++) {
			// for (var col = 0; col < map[row].length; col ++) {
				// if ((startCell.row + row) < 0 || (startCell.row + row) > 9 ||
					// (startCell.col + col) < 0 || (startCell.col + col) > 9) 
					// return;
				// if (bufferMap[startCell.row + row][startCell.col + col] === 1 &&
					// map[row][col] === 1)
					// return
				// if (map[row][col] === 1) {
					// bufferMap[startCell.row + row][startCell.col + col] = map[row][col];
					// lastCoordinates.push({row: startCell.row + row, col : startCell.col + col});
				// }
			// }
		// }
	// }
	// this.map = Matrix.copy(bufferMap);
	// Game.gameWorld.lastPosition = lastCoordinates;
	// return true;
// };

// grid.prototype.drawFigureOnGrid = function (startCell) {
	// var x = (startCell.col) * 55,
		// y = (startCell.row) * 55;
	// images.grid.context.drawImage(Game.gameWorld.activeFigure.figureImage, x, y);	
// };	

// grid.prototype.drawEmptyCells = function () {
	// for (var row = 0; row < this.map.length; row ++) {
		// for (var col = 0; col < this.map[row].length; col ++) {
			// if (this.map[row][col] === 0) {
				// var x = col * 55,
					// y = row * 55;
				// images.grid.context.drawImage(images.cell, x, y);
			// }
		// }
	// }
// };	

// grid.prototype.checkLines = function () {
	// var FullRows = Matrix.checkFullRows(this.map);
	// var FullCols = Matrix.checkFullCols(this.map);
	// if (FullRows) 
		// Matrix.clearRows(FullRows);
	// if (FullCols) 
		// Matrix.clearCols(FullCols);
	
	// if (FullRows.length && FullCols.length) {
		// Game.gameWorld.addBonusScore(FullRows.length + FullCols.length);
	// }
	// else {
		// if (FullRows.length)
			// Game.gameWorld.addBonusScore(FullRows.length);
		// if (FullCols.length)
			// Game.gameWorld.addBonusScore(FullCols.length);
	// }
// };

// grid.prototype.EachCellCheck = function (bufferMap, startCell, map) {
	// if(map[0][0] === undefined) {
		
		// for (var col = 0; col < map.length; col ++) {
			// if ((startCell.row) > 9 || (startCell.col + col) > 9  )
				// return false;
			// if (bufferMap[startCell.row][startCell.col + col] === 1 &&
				// map[col] === 1)
				// return false;
		// }
	// }
	// else {
		
		// for (var row = 0; row < map.length; row ++) {
			// for (var col = 0; col < map[row].length; col ++) {
				// if ((startCell.row + row) > 9 || (startCell.col + col) > 9  )
					// return false;
				// if (bufferMap[startCell.row + row][startCell.col + col] === 1 &&
					// map[row][col] === 1)
					// return false;
			// }
		// }
	// }
	// return true;
// };

// grid.prototype.gameOverCheck = function () {
	// var allNoFit = true,
		// figures = [Game.gameWorld.figurePanel.fig1,
				   // Game.gameWorld.figurePanel.fig2,
				   // Game.gameWorld.figurePanel.fig3];
	
	// for (var i = 0; i < 3; i ++) {
		
		// if (figures[i].visible) {
			// var bufferMap = Matrix.copy(this.map),
				// map = figures[i].map,
				// fit = false;
				
			// for (var row = 0; row < bufferMap.length; row ++) {
				// for (var col = 0; col < bufferMap[row].length; col ++) {
					// var temp = this.EachCellCheck(bufferMap, {col : col, row : row}, map); 
					// if(temp)
						// fit = true;
				// }
			// }
			// if (fit)
				// allNoFit = false;
		// }
	// }
	// if (allNoFit) 
		// Game.gameWorld.gameOver = true;
// }

// grid.prototype.update = function (delta) {
	
// };

// grid.prototype.draw = function () {
	// Canvas2D.drawImage(images.grid, this.position, this.origin);
	// this.drawEmptyCells();	
// };

// grid.prototype.reset = function () {
	// this.map = ([
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		  // ]);
// };
