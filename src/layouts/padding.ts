import { BoundingBox, Context, Element } from "../base";
import { CSSMargins, Margins, toEnglish } from "../utils";

export class Padding implements Element {
  private margins: Margins;
  constructor(cssMargins: CSSMargins, private element: Element) {
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

  draw(context: Context, _box: BoundingBox): void {
    const elementWidth = this.element.width(context, _box);
    const elementHeight = this.element.height(context, _box);

    const elBox: BoundingBox = {
      x: _box.x + this.margins.left,
      y: _box.y + this.margins.top,
      width: elementWidth - (this.margins.left + this.margins.right),
      height: elementHeight - (this.margins.top + this.margins.bottom)
    };

    this.element.draw(context, elBox);
  }
}
