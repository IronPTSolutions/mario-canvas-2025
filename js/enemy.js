class Enemy {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = this.ctx.canvas.width;
    this.y = 0.795 * this.ctx.canvas.height;

    this.vx = -3;

    this.img = new Image();
    this.img.src = "images/enemy.jpeg";

    this.w = 100;
    this.h = 75;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vx;
  }
}
