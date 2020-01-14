import { BoundingBox, Context, Element } from "../base";
import { FontStyle } from "../utils";

/**
 * `Paragraph` is essentially a paragraph.
 */
export class Paragraph implements Element {
  /**
   * Create a new paragraph element.
   * @param text string to be written
   * @param style font and color to use. Note that the font and font
   * size affect the `real` width and height of the text element
   */
  constructor(private text: string, private style?: FontStyle) {}

  width(context: Context, box: BoundingBox): number {
    return context.withFont(this.style, () => {
      return context.raw.widthOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  height(context: Context, box: BoundingBox): number {
    return context.withFont(this.style, () => {
      return context.raw.heightOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  draw(context: Context, box: BoundingBox): void {
    const textAlignment =
      this.style === undefined || this.style.align === undefined
        ? "left"
        : this.style.align;

    const textOptions = {
      width: box.width,
      height: box.height,
      align: textAlignment
    };
    context.withFont(this.style, () => {
      return context.raw.text(this.text, box.x, box.y, textOptions);
    });
  }
}

/**
 * Factory function for `Paragraph`
 * @param text string to be written
 * @param style font and color to use. Note that the font and font
 * size affect the `real` width and height of the text element
 */
export function p(text: string, style?: FontStyle) {
  return new Paragraph(text, style);
}
