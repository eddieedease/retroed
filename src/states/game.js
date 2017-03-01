//import Crosshairs from '../prefabs/crosshairs';
//import Target from '../prefabs/target';

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {


        this.playercanmove = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('spritesheet', 'tiles');
        this.map.addTilesetImage('spritesheetindoor', 'tilesindoor');
        this.layer = this.map.createLayer('background');
        this.layer.scale.set(2, 2); //Double the scale
        //this.layer.setScale(zoomlevel)
        this.cat = this.game.add.sprite(40, 60, 'cat');
        this.mysprite = this.game.add.sprite(15, 30, 'char');

        this.mysprite.scale.set(0.7, 0.7);


        // overlay map layer
        this.layer2 = this.map.createLayer('overlay');
        this.layer2.scale.set(2, 2);

        this.layer3 = this.map.createLayer('Col');
        this.layer3.setScale(2);
        this.layer3.visible = false;
        this.layer.resizeWorld();
        //this.layer2.scale.set(zoomlevel);

        // tile collisions   [strange block]
        this.map.setCollision(901, true, this.layer3);

        // TODO TODO TODO
        // SOOOOoooo Collisions are set up, but they won't scale with the layer scaling
        //this.blocks = this.game.physics.p2.convertTilemap(this.map, this.layer3, true, true);



        // NOTE what with the collides?
        //for (var i = 0; i < this.blocks.length; i++) {
        //this.blocks[i].debugbody=true;
        //this.block[i].body.setRectangle(100, 100);
        //  }

        // setting up physics
        // set up char

        //enabling arcade physics for main player
        this.game.physics.enable(this.mysprite);
        this.game.physics.enable(this.cat);
        this.cat.body.allowGravity = false;
        this.mysprite.body.allowGravity = false;


        this.mysprite.body.collideWorldBounds = true;


        //this.game.physics.p2.enable(, false);
        this.mysprite.animations.add('down', [0, 1, 2, 3], 10, true);
        this.mysprite.animations.add('right', [4, 5, 6, 7], 10, true);
        this.mysprite.animations.add('left', [8, 9, 10, 11], 10, true);
        this.mysprite.animations.add('up', [12, 13, 14, 15], 10, true);
        this.mysprite.body.fixedRotation = true;
        //this.mysprite.body.setZeroDamping();
        this.mysprite.frame = 4;
        this.charfacing = 'down';

        //this.game.physics.p2.enable(, false);
        this.cat.animations.add('down', [0, 1, 2, 3], 10, true);
        this.cat.animations.add('left', [4, 5, 6, 7], 10, true);
        this.cat.animations.add('right', [8, 9, 10, 11], 10, true);
        this.cat.animations.add('up', [12, 13, 14, 15], 10, true);
        this.cat.body.fixedRotation = true;
        //this.mysprite.body.setZeroDamping();
        this.cat.frame = 4;
        this.catfacing = 'down';


        this.game.camera.follow(this.mysprite);


        this.textbubble = this.game.add.image(this.game.camera.x + this.game.camera.width / 2, this.game.camera.y + this.game.camera.height + 300, 'textbubble');
        this.textbubble.visible = false;
        this.textbubble.anchor.set(0.5);

        this.text = this.game.add.bitmapText(100, 310, 'font', 'Hmmm...  \nShould be really doing something right about now', 30);
        this.text.fixedToCamera = true;
        this.text.visible = false;


        //creating controll keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.startDialogue, this);


        // TODO  Below starts the dialgoue venster





        //0this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        //this.game.input.onDown.add(this.resize, this);
        // NOTE Below original
        //add background image
        /*  this.background = this.game.add.sprite(0,0,'background');
          this.background.height = this.game.world.height;
          this.background.width = this.game.world.width;
          //setup UI
          this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Arial', fill: '#ffffff', align: 'center'
          });
          this.countdownText.anchor.set(0.5,0);
          //set up click listeners
          this.game.input.onDown.add(this.shoot, this);
          //setup audio
          this.gunshot = this.game.add.audio('gunshot');
          //setup prefabs
          this.crosshairs = new Crosshairs(this.game);
          this.target = new Target(this.game,this.game.world.centerX,this.game.world.centerY);
          this.game.add.existing(this.crosshairs);
          this.game.add.existing(this.target);
          //setup a timer to end the game
          this.endGameTimer = this.game.time.create();
          this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
          this.endGameTimer.start();*/
    }


    // NOTE NOTE function
    /*shoot(click){
      this.gunshot.play();
    }*/

    resize() {
        /*  if (this.layer.displayWidth !== undefined) {
              var w = this.layer.displayWidth + 100;
              var h = this.layer.displayHeight + 100;
              this.layer.resize(w, h);
          } else {
              if (this.layer.width < 800) {
                  var w = this.layer.width + 100;
                  var h = this.layer.height + 100;
                  this.layer.resize(w, h);
              }
          }*/
    }


    update() {




        this.game.physics.arcade.collide(this.mysprite, this.layer3);
        this.game.physics.arcade.collide(this.cat, this.layer3);

        // Font for debugging TODO TES TEST HAAL WEG
        //this.text.setText('EDease BITMAP text font tryout\nx: ' + Math.round(this.game.input.x) + ' y: ' + Math.round(this.game.input.y));


        //this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));

        // NOTE need states to hold the current states of the update
        if (this.playercanmove === true) {
            this.mysprite.body.velocity.x = 0;
            this.mysprite.body.velocity.y = 0;
            var updown;
            //for p2 this.mysprite.body.setZeroVelocity();
            if (this.cursors.up.isDown) {
                updown = true;
                this.charfacing = 'up';
                // GAMECHANGE
                //this.game.state.start('ogame',true);
                //this.mysprite.body.moveUp(300);
                this.mysprite.body.velocity.y = -300;
                this.mysprite.animations.play('up');
            } else if (this.cursors.down.isDown) {
                updown = true;
                this.charfacing = 'down';
                //this.mysprite.body.moveDown(300);
                this.mysprite.body.velocity.y = 300;
                this.mysprite.animations.play('down');
            } else if (this.cursors.left.isDown) {
                updown = true;
                this.charfacing = 'left';
                this.mysprite.body.velocity.x = -300;
                //this.mysprite.body.velocity.x = -300;
                this.mysprite.animations.play('left');
            } else if (this.cursors.right.isDown) {
                updown = true;
                this.charfacing = 'right';
                this.mysprite.body.velocity.x = 300;
                //this.mysprite.body.moveRight(300);
                this.mysprite.animations.play('right');
            } else {
                updown = false;
            }

            if (updown === false) {
                switch (this.charfacing) {
                    case 'down':
                        this.mysprite.frame = 3;
                        break;
                    case 'left':
                        this.mysprite.frame = 8;
                        break;
                    case 'right':
                        this.mysprite.frame = 7;
                        break;
                    case 'up':
                        this.mysprite.frame = 15;
                        break;
                }
            }
        } else {
            updown = false;
        }




        this.game.physics.arcade.moveToObject(this.cat, this.mysprite, 200);
        this.game.physics.arcade.overlap(this.cat, this.mysprite, this.catStop, null, this);

        //console.log(this.cat.body.velocity);

        if (this.cat.body.velocity.x > 100) {
            this.catfacing = 'right';
            this.cat.animations.play('right');
        } else if (this.cat.body.velocity.x < -100) {

            this.catfacing = 'left';
            this.cat.animations.play('left');
        }
        if (this.cat.body.velocity.y > 100) {
            this.cat.animations.play('down');
            this.catfacing = 'down';
        } else if (this.cat.body.velocity.y < -100) {
            this.cat.animations.play('up');
            this.catfacing = 'up';
        }

        //  if it's overlapping the mouse, don't move any more



    }

    catStop() {
        this.cat.body.velocity.setTo(0, 0);
        switch (this.catfacing) {
            case 'down':
                this.cat.frame = 3;
                break;
            case 'left':
                this.cat.frame = 7;
                break;
            case 'right':
                this.cat.frame = 8;
                break;
            case 'up':
                this.cat.frame = 15;
                break;
        }
    }


    endGame() {
        this.game.state.start('gameover');
    }


    startDialogue() {
        if (this.playercanmove === true) {

            var tweendialogue;
            //this.mysprite.body.setZeroVelocity();
            this.playercanmove = false;
            this.textbubble.x = this.game.camera.x + this.game.camera.width / 2
            this.textbubble.y = this.game.camera.y + this.game.camera.height + 300,
                this.textbubble.visible = true;
            this.mysprite.body.velocity.x = 0;
            this.mysprite.body.velocity.y = 0;
            tweendialogue = this.game.add.tween(this.textbubble).to({
                y: this.game.camera.y + this.game.camera.height / 4 * 3,
                x: this.game.camera.x + this.game.camera.width / 2
            }, 1000, Phaser.Easing.Bounce.Out, true);
            this.mysprite.animations.stop(null, true);


            tweendialogue.onComplete.add(this.showText, this);

        } else {
            //this.mysprite.body.setZeroVelocity();
            this.playercanmove = true;
            this.textbubble.visible = false;
            this.text.visible = false;

        }
    }


    showText() {
        this.text.visible = true;
    }

    shutdown() {


    }

}

export default Game;