BasicGame.Game = function (game) {
	var enemies;
	var ammo;
	var level;
	var hud;
	var hurt;
	var shoot;
	var crosshair;
	var healthicon;
	var health;
	var ammoicon;
	var healthtxt;
	var ammotxt;
	var player;
	var cursors;
	var shootkey;
	var shoottime = 0;
	var winscreen;
	var losescreen;
	var donetxt;
	var count;
	var numberkilled;
	
	var winmusic;
	var level1mus;
	var losemusic;
	var spawn;
	var pistol;
	var attack;
	var die;
	var empty;
	
};

BasicGame.Game.prototype = {

	create: function () {
		winmusic = this.add.audio('winmusic');
		level1mus = this.add.audio('level1');
		losemusic = this.add.audio('losemusic');
		spawn = this.add.audio('spawn');
		spawn.volume = .2;
		pistol = this.add.audio('pistol');
		attack = this.add.audio('attack');
		die = this.add.audio('die');
		empty = this.add.audio('empty');
		level1mus.play('',0,0.7,true,true);
		numberkilled = 0;
		count = 0;
		shoottime = 0;
		level = this.add.sprite(20,30,'forest');
		level.scale.y = 1.3;
		level.body.velocity.x = -10;
		enemies = this.add.group();
		this.addEnemy();
		this.time.events.loop(this.rnd.integerInRange(500,1500), this.addEnemy, this);
		crosshair = this.add.sprite(250,250, 'crosshair');
		//crosshair.body.setRectangle(32,32,4,4);
		hurt = this.add.sprite(0,0, 'hit');
		hurt.visible = false;
		shoot = this.add.sprite(0,0,'shoot');
		shoot.visible = false;
		
		hud = this.add.sprite(0,0,'hud');
		
		player = this.add.sprite(575, 25, 'player');
		player.animations.add('100', [0], true);
		player.animations.add('75', [1], true);
		player.animations.add('50', [2], true);
		player.animations.add('25', [3], true);
		player.animations.play('100');
		
		health = 100;
		healthicon = this.add.sprite(20, 450,'health');
		healthtxt = this.add.text(70, 450, " " + health);
		
		ammo = 100;
		ammonicon = this.add.sprite(150,450, 'ammo');
		ammotxt = this.add.text(200, 450, " " + ammo);
		
		this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP ]);
		
		losescreen = this.add.sprite(0,0,'lose');
		losescreen.visible = false;
		winscreen = this.add.sprite(0,0,'win');
		winscreen.visible = false;
		
		donetxt = this.add.text(this.world.centerX-100, this.world.centerY, "", 
		{
			font: "26px Arial",
			fill: "#ffffff",
			align: "left"
		});
		
		
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},
	
	addEnemy: function(){
		spawn.play();
		var newenem = enemies.create(Math.random()*550 +20, Math.random*30+30, 'enem1');
		newenem.animations.add('down', [0,1,2,3,4,5,6,7,8], true);
		newenem.animations.play('down');
		newenem.body.velocity.y = Math.random()*75;
		newenem.body.velocity.x = -10;
		//newenem.body.setRectangle(32,50,5,8);
	},

	update: function () {
		console.log("updating\n");
		if (shoot.visible == true){
			shoot.visible = false;
		}
		if (hurt.visible == true){
			hurt.visible = false;
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && crosshair.world.x > 25){
			crosshair.body.velocity.x = -300;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && crosshair.world.x < 515){
			crosshair.body.velocity.x = 300;
		}
		else{
			crosshair.body.velocity.x = 0;
		}
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && crosshair.world.y > 25){
			crosshair.body.velocity.y = -250;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) && crosshair.world.y < 375){
			crosshair.body.velocity.y = 250;
		}
		else{
			crosshair.body.velocity.y = 0;
		} 
	
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			if (ammo>0){
				this.firebullet();
				this.game.physics.overlap(crosshair,enemies, this.CollisionHandler, null, this);
			}
			else{
				if (this.game.time.now>shoottime){
					empty.play();
					shoottime = this.game.time.now+100;
				}
			}
		}
		this.updateEnem();
		if (health >75){
			player.animations.play('100');
		}
		else if (health > 50){
			player.animations.play('75');
		}
		else if (health > 25) {
			player.animations.play('50');
		}
		else{
			player.animations.play('25');
		}
		healthtxt.setText(" " + health);
		ammotxt.setText(" " + ammo);
		if (numberkilled > 40){
			ammo += 25;
			numberkilled -= 40;
		}
		if(level.body.x < -1500){
			winscreen.visible = true;
			donetxt.setText("You Win!");
			winmusic.play();
			level1mus.pause();
			spawn.volume = 0;
			attack.volume = 0;
			count++;
		}
		if (health <= 0){
			losescreen.visible = true;
			donetxt.setText("You got eaten!");
			losemusic.play();
			level1mus.pause();
			spawn.volume = 0;
			attack.volume = 0;
			count++;
		}
		if (count > 300){
			losemusic.volume = 0;
			winmusic.volume = 0;
			this.quitGame();
		}

	},
	updateEnem: function(){
		for (var i = 0; i<enemies.length;i++){
			if (enemies.getAt(i).alive){
				enemies.getAt(i).animations.play('down');
				if (enemies.getAt(i).world.x < 25 || enemies.getAt(i).world.x > 500){
					enemies.getAt(i).kill();
				}
				else if (enemies.getAt(i).world.y >= 350){
					health -= 10;
					attack.play();
					hurt.visible = true;
					enemies.getAt(i).kill();
				}
				enemies.getAt(i).scale.x += .001;
				enemies.getAt(i).scale.y += .001;
			}
			
		}
	},
	firebullet: function(){
		if (this.game.time.now>shoottime){
			pistol.play();
			shoot.visible = true;
			ammo--;
			shoottime = this.game.time.now+100;
		}
	},
	CollisionHandler: function(crosshair, enemy){
		console.log("collisionhandler");
		die.play();
		enemy.kill();
		numberkilled++;
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		
		this.game.state.start('MainMenu');

	}

};