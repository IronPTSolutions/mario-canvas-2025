class Game {
  constructor(canvas) {
    this.canvas = canvas;

    // init canvas context to draw
    this.ctx = this.canvas.getContext("2d");

    // game elements
    this.interval = null;
    this.player = new Player(this.ctx);
    this.bg = new Background(this.ctx);

    this.audio = new Audio("./audio/music.mp3");
    this.audio.volume = 0.05;
    this.audio.loop = true;
  }

  start() {
    // <audio> HTML tag:
    this.audio.play();

    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
    }, 1000 / 60); // 60 Frames per Second

    // one listener for all
    document.addEventListener("keydown", this.onKeyDown.bind(this)); // bind: force "this" value inside onKeyDown function
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyDown(event) {
    this.player.onKeyDown(event);
  }

  onKeyUp(event) {
    this.player.onKeyUp(event);
  }

  pause() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
    document.removeEventListener("keydown", this.onKeyDown);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    // draw everything
    this.bg.draw();
    this.player.draw();
  }

  move() {
    // move everything
    this.bg.move();
    this.player.move();
  }
}
