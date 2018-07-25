"use strict";

function buttonStart (position) {
	Button.call(this, sprites.start_icon);
	this.position = position;
}

buttonStart.prototype = Object.create(Button.prototype);

buttonStart.prototype.handleInput = function (delta) {
	if (Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonStart.prototype.onPressAction = function (delta) {
	// console.log(Mouse._startPosition);
	
	Game.gameWorld.titleScreen.on = false;
};

///////////////////////////////////////////////////////////////////

function buttonSettings (position) {
	Button.call(this, sprites.settings_icon);
	this.position = position;
}

buttonSettings.prototype = Object.create(Button.prototype);

buttonSettings.prototype.handleInput = function (delta) {
	if (Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonSettings.prototype.onPressAction = function (delta) {
	console.log('settings');
	
	// Game.gameWorld.settingsScreen.on = true;
};

///////////////////////////////////////////////////////////////////

function buttonQuit (position) {
	Button.call(this, sprites.quit_icon);
	this.position = position;
}

buttonQuit.prototype = Object.create(Button.prototype);

buttonQuit.prototype.handleInput = function (delta) {
	if (Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonQuit.prototype.onPressAction = function (delta) {
	console.log('quit');
	
	// Game.gameWorld.settingsScreen.on = true;
};

///////////////////////////////////////////////////////////////////

function buttonSound (position) {
	Button.call(this, sprites.soundOn_icon);
	this.position = position;
	this.on = true;
}

buttonSound.prototype = Object.create(Button.prototype);

buttonSound.prototype.handleInput = function (delta) {
	if (!Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonSound.prototype.onPressAction = function (delta) {
	this.on = !this.on;
	console.log('sounddddd')
	if (this.on) {
		sounds.pop.volume = 1;
		this.image = sprites.soundOn_icon;
	}
	else {
		sounds.pop.volume = 0;
		this.image = sprites.soundOff_icon;
	}
};

///////////////////////////////////////////////////////////////////

function buttonMenu () {
	Button.call(this, sprites.menu_icon);
	// Button.call(this, images.btn_menu);
	this.position = new Vector2(50, 50);
}

buttonMenu.prototype = Object.create(Button.prototype);

buttonMenu.prototype.handleInput = function (delta) {
	if (!Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonMenu.prototype.onPressAction = function (delta) {
	Game.gameWorld.titleScreen.on = true;
};

///////////////////////////////////////////////////////////////////

function buttonRestart () {
	Button.call(this, sprites.restart_icon)
	this.position = new Vector2(525, 50);
}

buttonRestart.prototype = Object.create(Button.prototype);

buttonRestart.prototype.handleInput = function (delta) {
	if (!Game.gameWorld.titleScreen.on) {
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	}
};

buttonRestart.prototype.onPressAction = function (delta) {
	// Game.gameWorld.reset();
	console.log('restart')
	
	Game.gameWorld.restartScreen.on = true;
};

///////////////////////////////////////////////////////////////////

function buttonConfirm (position) {
	AnimatedButton.call(this, sprites.confirm_icon);
	this.position = position;
}

buttonConfirm.prototype = Object.create(AnimatedButton.prototype);

buttonConfirm.prototype.handleInput = function (delta) {
	
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	
};

buttonConfirm.prototype.onPressAction = function (delta) {
	Game.gameWorld.reset();
	Game.gameWorld.restartScreen.on = false;
};

///////////////////////////////////////////////////////////////////

function buttonCancel (position) {
	AnimatedButton.call(this, sprites.cancel_icon);
	this.position = position;
}

buttonCancel.prototype = Object.create(AnimatedButton.prototype);

buttonCancel.prototype.handleInput = function (delta) {
	
		if (Touch.isTouchDevice) 
			this.handleTouchInput();
		else 
			this.handleMouseInput();
	
};

buttonCancel.prototype.onPressAction = function (delta) {
	Game.gameWorld.restartScreen.on = false;
};
