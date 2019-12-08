import { BoundingBox, Context, Element } from "../base";
import { FontConfig } from "../utils";

/**
 * `Text` is essentially a paragraph.
 */
export class Text implements Element {
  /**
   * Create a new text element.
   * @param text string to be written
   * @param config font and color to use. Note that the font and font
   * size affect the `real` width and height of the text element
   */
  constructor(private text: string, private config?: FontConfig) {}

  width(context: Context, box: BoundingBox): number {
    return context.withFont(this.config, () => {
      return context.raw.widthOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  height(context: Context, box: BoundingBox): number {
    return context.withFont(this.config, () => {
      return context.raw.heightOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  draw(context: Context, box: BoundingBox): void {
    context.withFont(this.config, () => {
      return context.raw.text(this.text, box.x, box.y, {
        width: box.width,
        height: box.height
      });
    });
  }
}
