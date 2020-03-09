import memoize from "memoizee";
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
  constructor(
    private text: string,
    private style: FontStyle = { align: "left" }
  ) {
    this.width = memoize(this.width.bind(this));
    this.height = memoize(this.height.bind(this));
  }

  protected textOptions(box: BoundingBox): PDFKit.Mixins.TextOptions {
    return {
      width: box.width,
      height: box.height,
      align: this.style.align,
      characterSpacing: this.style.letterSpacing
    };
  }

  width(context: Context, box: BoundingBox): number {
    return context.withFont(this.style, () => {
      const width = Math.ceil(
        context.raw.widthOfString(this.text, this.textOptions(box))
      );
      return width;
    });
  }

  height(context: Context, box: BoundingBox): number {
    return context.withFont(this.style, () => {
      return Math.ceil(
        context.raw.heightOfString(this.text, this.textOptions(box))
      );
    });
  }

  draw(context: Context, box: BoundingBox): void {
    if (this.style.verticalAlignment) {
      const height = this.height(context, box);
      box.y += Math.floor((box.height - height) / 2);
    }

    context.withFont(this.style, () => {
      return context.raw.text(this.text, box.x, box.y, this.textOptions(box));
    });
  }
}
