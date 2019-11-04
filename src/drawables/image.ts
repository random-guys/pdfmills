import { BoundingBox, Context, Element } from '../base';

export class Image implements Element {
  constructor(private src: string, private w: number, private h: number) {}

  width(): number {
    return this.w;
  }

  height(): number {
    return this.h;
  }

  draw(context: Context, box: BoundingBox): void {
    context.raw.image(this.src, box.x, box.y, {
      fit: [this.w, this.h]
    });
  }
}
