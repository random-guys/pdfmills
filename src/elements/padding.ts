import { BoundingBox, Context, Element } from "../base";
import { CSSMargins, Margins, toEnglish } from "../utils";
import { removeMargins } from "../base/boundingBox";

export class Padding implements Element {
  private margins: Margins;
  constructor(private cssMargins: CSSMargins, private element: Element) {
    this.margins = toEnglish(cssMargins);
  }

  width(context: Context, box: BoundingBox): number {
    return (
      this.element.width(context, box) +
      (this.margins.left + this.margins.right)
    );
  }

  height(context: Context, box: BoundingBox): number {
    return (
      this.element.height(context, box) +
      (this.margins.top + this.margins.bottom)
    );
  }

  draw(context: Context, box: BoundingBox): void {
    const marginalized = removeMargins(box, this.cssMargins);
    this.element.draw(context, {
      ...marginalized,
      x: box.x + this.margins.left,
      y: box.y + this.margins.top
    });
  }
}
