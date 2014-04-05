BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(250, 350, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('ammo', 'assets/ammoicon.png');
		this.load.image('crosshair','assets/crosshair.png');
		this.load.image('forest', 'assets/forestback.png');
		this.load.spritesheet('player', 'assets/gamerimage.png',200,151);
		this.load.image('health', 'assets/healthicon.png');
		this.load.image('hud', 'assets/hud.png');
		this.load.image('hit', 'assets/hurt.png');
		this.load.image('shoot', 'assets/shoot.png');
		this.load.spritesheet('enem1', 'assets/skeleton.png',47,64);
		this.load.spritesheet('enem2', 'assets/skeleton1.png');
		this.load.spritesheet('enem3', 'assets/zombie1.png');
		this.load.spritesheet('enem4', 'assets/zombie2.png');
		this.load.spritesheet('enem5', 'assets/zombieking.png');
		this.load.image('win', 'assets/win.png');
		this.load.image('lose', 'assets/lost.png');
		
		this.load.audio('winmusic',['assets/win.wav']);
		this.load.audio('level1',['assets/level1.mp3']);
		this.load.audio('losemusic',['assets/lose.mp3']);
		this.load.audio('spawn',['assets/spawn.wav']);
		this.load.audio('pistol',['assets/pistol.wav']);
		this.load.audio('attack',['assets/attack.wav']);
		this.load.audio('die',['assets/die.wav']);
		this.load.audio('empty',['assets/click_1.wav']);
		this.load.audio('titlemusic', ['assets/mainmenu.mp3']);
		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'assets/title.png');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titlemusic') && this.ready == false){
			this.ready = true;
			this.game.state.start('MainMenu');
		}

	}

};