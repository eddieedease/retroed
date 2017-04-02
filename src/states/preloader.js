class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
    this.game.load.image('background','assets/bg_wood.png');
    //this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');
    this.game.load.image('text_go', 'assets/text_go.png');
    this.game.load.image('text_ready', 'assets/text_ready.png');

    // loading tilemap
    this.game.load.tilemap('map', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/spritesheet.png');
    this.game.load.image('tilesindoor', 'assets/spritesheetindoor.png');
    //this.game.load.image('tilesindoor', 'assets/spritesheetindoor.png');

    this.game.load.spritesheet('char', 'assets/charsheet.png', 45, 59);
    this.game.load.spritesheet('cat', 'assets/cat.png', 32, 32);

    this.game.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');


    this.game.load.image('textbubble', 'assets/textbubble.png');
    this.game.load.image('crosshairs', 'assets/crosshair.png');

    this.game.load.spritesheet('target', 'assets/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');
    this.game.load.audio('energy','assets/energy.ogg');
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
