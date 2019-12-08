import { BoundingBox, Context, Drawable } from "../base";
import { ColorValue, getRGB } from "../utils";

export class Background implements Drawable {
  constructor(private color: ColorValue) {}

  draw(context: Context, box: BoundingBox): void {
    context.raw
      .rect(box.x, box.y, box.width, box.height)
      .fill(getRGB(this.color));
  }
}
