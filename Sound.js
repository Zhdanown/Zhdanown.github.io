"use strict";

function Sound (sound) {
	this.snd = new Audio();
	/*if (this.snd.canPlayType("audio/ogg")) {
		this.snd.src = sound + ".ogg";
	} else */if (this.snd.canPlayType("audio/mpeg")) {
		this.snd.src = sound + ".mp3"
	} else 
		this.snd = null;
}

Object.defineProperty(Sound.prototype, "volume", 
{
	get: function () {
		return this.snd.volume;
	},
	set: function (value) {
		this.snd.volume = value
	}
});

Sound.prototype.play = function () {
	if (this.snd === null)
		return;
	this.snd.load();
	this.snd.autoplay = true;
};