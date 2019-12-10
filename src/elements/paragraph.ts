import { BoundingBox, Context, Element, TextStyle } from "../base";

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
  constructor(private text: string, private style?: TextStyle) {}

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
    context.withFont(this.style, () => {
      return context.raw.text(this.text, box.x, box.y, {
        width: box.width,
        height: box.height
      });
    });
  }
}

/**
 * Factory function for `Paragraph`
 * @param text string to be written
 * @param style font and color to use. Note that the font and font
 * size affect the `real` width and height of the text element
 */
export function p(text: string, style?: TextStyle) {
  return new Paragraph(text, style);
}
