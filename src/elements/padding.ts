import { BoundingBox, Context, Element } from "../base";
import { CSSMargins, Margins, toEnglish } from "../utils";
import { removeMargins } from "../base/bounding-box";

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

  draw(context: Context, _box: BoundingBox): void {
    const marginalized = removeMargins(_box, this.cssMargins);
    this.element.draw(context, {
      ...marginalized,
      x: _box.x + this.margins.left,
      y: _box.y + this.margins.top
    });
  }
}
