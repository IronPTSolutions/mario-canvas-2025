class Coin {
  constructor(ctx) {
    this.ctx = ctx;

    this.r = 25;
    this.x = this.ctx.canvas.width + this.r;

    const min = 50;
    const max = 80;

    this.y =
      ((Math.random() * (max - min) + min) / 100) * this.ctx.canvas.height;

    this.fillStyle = "yellow";

    this.vx = -2;

    this.alive = true;
  }

  die() {
    this.alive = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.stroke();
    const defaultFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = defaultFillStyle;
  }

  move() {
    this.x += this.vx;

    // detect coin left of canvas and mark it for deletion
    if (this.x + this.r <= 0) {
      this.die();
    }
  }
}
