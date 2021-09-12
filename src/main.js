import { Block } from "./Block.js";
import { CanvasActuator } from "./CanvasActuator.js";

class Sketck {
  constructor() {
    this.court = { pos: { x: 0, y: 0 }, dim: { w: 1000, h: 200 } };
    this.canvas = new CanvasActuator(this.court, "#CCC");
    this.block1 = new Block(this.court, 100, 20, 1, 0);
    this.block2 = new Block(this.court, 300, 100, 100, -5);
    this.setup();
  }
  setup() {
    this.canvas.on("draw", this.draw.bind(this));
    this.canvas.on("update", this.update.bind(this));
  }
  update() {
    this.block1.update();
    this.block2.update();
    if (this.block1.collide(this.block2)) {
      const v1 = this.block1.bounce(this.block2);
      const v2 = this.block2.bounce(this.block1);
      this.block1.vel = v1;
      this.block2.vel = v2;
    }
    this.block1.hitWall();
  }
  draw(ctx) {
    this.block1.draw(ctx);
    this.block2.draw(ctx);
  }
}

new Sketck();
