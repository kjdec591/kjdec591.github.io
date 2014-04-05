BasicGame.MainMenu = function (game) {

	this.music = null;
	//this.playButton = null;
	//this.cursors = null;
};

BasicGame.MainMenu.prototype = {
	
	

	create: function () {
		console.log("got to mainmenu");

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titlemusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlepage');
		this.add.text(this.world.centerX, this.world.centerY,"Press Spacebar to start!"); 
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	},

	update: function () {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.music.pause();
			this.game.state.start('Game');
		}
		//	Do some nice funky main menu effect here

	},

	

};