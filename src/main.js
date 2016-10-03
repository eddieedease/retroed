 import Boot from './states/boot';
 import Game from './states/game';
 import OGame from './states/ogame';
 import Menu from './states/menu';
 import Preloader from './states/preloader';
 import Gameover from './states/gameover';
 import Battle from './states/battle';


const game = new Phaser.Game(800, 500, Phaser.AUTO, 'edrogue-game');

 game.state.add('boot', new Boot());
 game.state.add('game', new Game());
 game.state.add('ogame', new OGame());
 game.state.add('menu', new Menu());
 game.state.add('preloader', new Preloader());
 game.state.add('gameover', new Gameover());
 game.state.add('battle', new Gameover());

game.state.start('boot');
