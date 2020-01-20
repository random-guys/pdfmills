import { BoundingBox, Context, Element, LineBreakStyle } from "../base";

/**
 * `LineBreak` is just vertical space between block elements.
 */
export class LineBreak implements Element {
  name: string = "LineBreak";

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

/**
 * Factory function to create a new line break
 * @param height height of vertical space in px
 */
export function br(height: number) {
  return new LineBreak({ height });
}
