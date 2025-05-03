class Game {
  constructor(canvas) {
    this.canvas = canvas;

    // init canvas context to draw
    this.ctx = this.canvas.getContext("2d");

    // game elements
    this.interval = null;
    this.player = new Player(this.ctx);
    this.bg = new Background(this.ctx);

    this.coins = [new Coin(this.ctx)];
    this.enemies = [new Enemy(this.ctx)];

    this.audio = new Audio("./audio/music.mp3");
    this.audio.volume = 0.05;
    this.audio.loop = true;

    this.drawCount = 0;
    this.calculateRandomCoinTarget();
    this.calculateRandomEnemyTarget();
  }

  start() {
    // <audio> HTML tag:
    this.audio.play();

    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();

      this.addCoin();
      this.addEnemy();

      this.checkCollisions();
    }, 1000 / 60); // 60 Frames per Second

    // one listener for all
    document.addEventListener("keydown", this.onKeyDown.bind(this)); // bind: force "this" value inside onKeyDown function
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  checkCollisions() {
    this.checkCoinsCollisions();
    this.checkEnemiesCollisions();
  }

  checkEnemiesCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.collidesEnemy(enemy)) {
        this.pause();
      }
    });
  }

  checkCoinsCollisions() {
    this.coins.forEach((coin) => {
      if (this.player.collidesCoin(coin)) {
        coin.die();
      }
    });

    this.coins = this.coins.filter((c) => c.alive);
  }

  calculateRandomCoinTarget() {
    this.randomCoinTarget = Math.floor(Math.random() * (500 - 100) + 100);
  }

  calculateRandomEnemyTarget() {
    this.randomEnemyTarget = Math.floor(Math.random() * (500 - 100) + 100);
  }

  addCoin() {
    if (this.drawCount >= this.randomCoinTarget) {
      this.drawCount = 0;

      this.calculateRandomCoinTarget();

      const newCoin = new Coin(this.ctx);

      this.coins.push(newCoin);
    }
  }

  addEnemy() {
    if (this.drawCount >= this.randomEnemyTarget) {
      this.drawCount = 0;

      this.calculateRandomEnemyTarget();

      const newEnemy = new Enemy(this.ctx);

      this.enemies.push(newEnemy);
    }
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
    document.removeEventListener("keyup", this.onKeyUp);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.drawCount++;
    // limit drawCount to avoid infinity
    if (this.drawCount > 1_000_000) {
      this.drawCount = 0;
    }

    // draw everything
    this.bg.draw();
    this.player.draw();
    this.coins.forEach((coin) => coin.draw());
    this.enemies.forEach((enemy) => enemy.draw());
  }

  move() {
    // move everything
    this.bg.move();
    this.player.move();
    this.coins.forEach((coin) => coin.move());
    this.enemies.forEach((enemy) => enemy.move());
  }
}
