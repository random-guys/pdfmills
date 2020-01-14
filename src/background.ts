import { BoundingBox, Context, Drawable, Element, Layout } from "./base";
import { ColorValue, getRGB } from "./utils";

/**
 * `Background` is used to draw a background color over any
 * arbitrary bounding box.
 */
export class Background implements Drawable {
  /**
   * Create a background that can be drawn anywhere
   * @param color background color
   */
  constructor(private color: ColorValue) {}

  draw(context: Context, box: BoundingBox): void {
    context.raw
      .rect(box.x, box.y, box.width, box.height)
      .fill(getRGB(this.color));
  }
}

/**
 *
 * @param color the background color
 */
export function bg(color: ColorValue, element?: Element) {
  if (element) return new ElementBackground(color, element);
  else return new Background(color);
}

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
