import { BoundingBox, Context, Element, Drawable } from "../base";
import { ColorValue, getRGB } from "../utils";

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

/**
 * `BackgroundImage` is the equivalent of `background-image` CSS property
 */
export class ImageBackground implements Drawable {
  /**
   * Create a new image without drawing it
   * @param src path to the source image. For the sake of everyone involved please use an
   * absolute path
   */
  constructor(private src: string) {}

  draw(context: Context, box: BoundingBox): void {
    context.raw.image(this.src, box.x, box.y, {
      fit: [box.width, box.height]
    });
  }
}
