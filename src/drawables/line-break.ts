import { Element, Context, BoundingBox } from '../base';

export class LineBreak implements Element {
  constructor(private h: number) {}

  width(context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    return this.h;
  }

  draw(context: Context, box: BoundingBox): void {}
}
