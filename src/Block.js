export class Block {
  constructor(court, x, w, m, vel) {
    this.court = court;
    this.pos = { x, y: this.court.dim.h - w };
    this.dim = { w, h: w };
    this.vel = vel;
    this.mass = m;
  }

  hitWall() {
    if (this.pos.x <= 0) {
      this.vel *= -1;
    }
  }

  collide(other) {
    return !(
      this.pos.x + this.dim.w < other.pos.x ||
      this.pos.x > other.pos.x + other.dim.w
    );
  }

  bounce(other) {
    const sumM = this.mass + other.mass;
    const part1 = ((this.mass - other.mass) / sumM) * this.vel;
    const part2 = ((2 * other.mass) / sumM) * other.vel;
    const newV = part1 + part2;
    return newV;
  }

  update() {
    this.pos.x += this.vel;
  }

  draw(ctx) {
    ctx.fillStyle = "#F00";
    ctx.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }
}
