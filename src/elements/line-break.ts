import { BoundingBox, Context, Element, LineBreakStyle } from "../base";

/**
 * `LineBreak` is just vertical space between block elements.
 */
export class LineBreak implements Element {
  /**
   * Create a new line break
   * @param style configuration for line break
   */
  constructor(private style: LineBreakStyle) {}

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height() {
    return this.style.height;
  }

  draw() {}
}
