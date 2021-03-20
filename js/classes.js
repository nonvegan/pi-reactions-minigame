import { getRandomFloat, getRandomInt } from "./helpers.js";

class Game {
  constructor(size) {
    this.playing = true;
    this.size = size;
    this.maxKeys = 4;
    this.bgColor = "#21252b";
    this.player = {
      x: 0,
      speed: 1,
      score: 0,
      color: "#f92672",
    };
    const a = getRandomFloat(Math.PI / 3, (4 * Math.PI) / 3);
    this.target = {
      a: a,
      b: a + getRandomFloat(Math.PI / 6, Math.PI / 3),
      key: getRandomInt(1, this.maxKeys),
      color: "#ae81ff",
    };
  }

  draw(ctx) {
    ctx.rotate(-Math.PI / 2);
    ctx.lineWidth = this.size / 4;
    ctx.beginPath();
    ctx.strokeStyle = this.bgColor;
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = this.target.color;
    ctx.arc(0, 0, this.size, this.target.a, this.target.b);
    ctx.stroke();
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.strokeStyle = this.player.color;
    ctx.arc(0, 0, this.size, 0, this.player.x);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.player.color;
    ctx.rotate(Math.PI / 2);
    ctx.fillText(this.target.key, 0, 0);
    ctx.font = `${this.size / 2.5}px Arial`;
    if (!this.playing) {
      ctx.fillText("You Suck!", 0, 1.5 * this.size);
      ctx.fillText(`Score: ${this.player.score}`, 0, 1.9 * this.size);
    } else {
      ctx.fillText(`Score: ${this.player.score}`, 0, 1.5 * this.size);
    }
  }

  update() {
    if (this.playing) {
      this.player.x += this.player.speed / 100;
      if (this.player.x > 2 * Math.PI) {
        this.playing = false;
      }
    }
  }

  reset() {
    this.playing = true;
    this.player.score = 0;
    this.player.speed = 1;
    this.next();
  }

  next() {
    this.player.x = 0;
    let prevKey = this.target.key;
    do {
      this.target.key = getRandomInt(1, this.maxKeys);
    } while (prevKey == this.target.key);
    this.target.a = getRandomFloat(Math.PI / 3, (4 * Math.PI) / 3);
    this.target.b = this.target.a + getRandomFloat(Math.PI / 6, Math.PI / 3);
  }

  input(key) {
    if (this.playing && !isNaN(parseInt(key))) {
      if (key == this.target.key && this.player.x > this.target.a && this.player.x < this.target.b) {
            this.player.score++;
            this.player.speed += 0.1;
        this.next();
      } else {
        this.playing = false;
      }
    } else if (key === " ") {
      this.reset();
    }
  }
}

export { Game };
