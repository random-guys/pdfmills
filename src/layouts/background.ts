import { BoundingBox, Context, Drawable } from "../base";
import { ColorValue, getRGB } from "../utils";

/**
 * `Background` is used to draw a background color over any
 * arbitrary bounding box.
 */
export class Background implements Drawable {
  name: string = "Background";

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
