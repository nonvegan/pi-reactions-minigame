import { Game } from "./classes.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");
const width = Math.min(window.innerWidth, window.innerHeight) / 1.6;
const height = Math.min(window.innerWidth, window.innerHeight) / 1.6;

const game = new Game(width / 5);

function setup() {
  canvas.width = width;
  canvas.height = height;
  ctx.translate(width / 2, height / 2);
  resetButton.addEventListener("click", () => {
    reset();
  });
}

document.addEventListener("keydown", (evt) => game.input(evt.key));

function reset() {
  game.reset();
}

function clear() {
  ctx.clearRect(-width / 2, -height / 2, width, height);
}

function animate() {
  clear();
  game.draw(ctx);
  game.update();
  requestAnimationFrame(animate);
}
setup();
animate();
