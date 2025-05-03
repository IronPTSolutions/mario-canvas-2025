class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0.4;
    this.x = 50;
    this.y0 = 570;
    this.y = this.y0;
    this.w = 75;
    this.h0 = 150;
    this.h = this.h0;

    this.img = new Image();
    this.img.src = "./images/mario.sprite.png";
    this.img.frames = 3;
    this.img.frameIndex = 2;

    // increment on draw to animate every X draws
    this.drawCount = 0;

    this.jumpAudio = new Audio("./audio/jump.mp3");
    this.jumpAudio.volume = 0.1;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames, // source X
      0, // source Y
      this.img.width / this.img.frames, // source Width
      this.img.height, // source Height
      this.x, // destination X
      this.y, // destination Y
      this.w, // destination Width
      this.h // destination Height
    );

    // draw different part of sprite image
    this.animateSprite();
  }

  animateSprite() {
    if (!this.isOnTheFloor()) {
      return;
    }

    this.drawCount++;

    if (this.drawCount > 10) {
      this.drawCount = 0;

      // animate sprite

      this.img.frameIndex++;

      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    // check floor collision
    if (this.isOnTheFloor()) {
      this.vy = 0;
      this.y = this.y0;
    }
  }

  isOnTheFloor() {
    return this.y >= this.y0;
  }

  jump() {
    if (this.isOnTheFloor()) {
      this.jumpAudio.play();
      this.vy = -15;
    }
  }

  isCrouched() {
    return this.h != this.h0;
  }

  crouch() {
    if (!this.isCrouched() && this.isOnTheFloor()) {
      this.h = this.h / 2;
      this.y0 += this.h;
      this.y = this.y0;
    }
  }

  standUp() {
    if (this.isCrouched()) {
      this.y0 -= this.h;
      this.h = this.h0;
    }
  }

  onKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        this.crouch();
        break;
      case "ArrowUp":
        this.jump();
        break;
      case "ArrowRight":
        this.vx = 10;
        break;
      case "ArrowLeft":
        this.vx = -10;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.key) {
      case "ArrowDown":
        this.standUp();
        break;
      case "ArrowRight":
      case "ArrowLeft":
        this.vx = 0;
        break;
    }
  }

  collidesCoin(c) {
    // colX = lado izquierdo moneda <= lado derecho mario y lado derecho moneda >= lado izquierod mario
    const colX = c.x - c.r <= this.x + this.w && c.x + c.r >= this.x;

    // colY = lado inferior moneda >= lado superior mario y lado superior moneda <= lado inferior mario
    const colY = c.y + c.r >= this.y && c.y - c.r <= this.y + this.h;

    return colX && colY;
  }

  collidesEnemy(e) {
    const padding = 20;

    const colX =
      e.x <= this.x + this.w - padding && e.x + e.w >= this.x + padding;
    const colY = e.y + e.h >= this.y && e.y <= this.y + this.h - padding;

    return colX && colY;
  }
}
