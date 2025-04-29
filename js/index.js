const canvas = document.getElementById("canvas");

const game = new Game(canvas);

document.getElementById("start").onclick = () => {
  game.start();
};
