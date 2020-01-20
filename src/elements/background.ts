import { BoundingBox, Context, Element } from "../base";
import { ColorValue, getRGB } from "../utils";
/**
 * `ElementBackground` is basically a background drawn into the bounding
 * box of any element.
 */
export class ElementBackground implements Element {
  constructor(private color: ColorValue, private element: Element) {}

  width(_context: Context, box: BoundingBox): number {
    return this.element.width(_context, box);
  }

  height(_context: Context, box: BoundingBox): number {
    return this.element.height(_context, box);
  }

  draw(context: Context, box: BoundingBox): void {
    context.raw
      .rect(box.x, box.y, box.width, box.height)
      .fill(getRGB(this.color));
    this.element.draw(context, box);
  }
}
