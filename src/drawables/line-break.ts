import { Element, Context, BoundingBox } from "../base";

/**
 * `LineBreak` is just vertical space between block elements.
 */
export class LineBreak implements Element {
  /**
   * Create a new line break
   * @param h height of the break
   */
  constructor(private h: number) {}

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height() {
    return this.h;
  }

  draw() {}
}
