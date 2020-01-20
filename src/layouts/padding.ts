import { Layout, Context, Element, BoundingBox } from "../base";
import { toEnglish, CSSMargins, Margins, getRGB } from "../utils";

export class Padding implements Element {
  name: string = "Padding";

  constructor(private margins: CSSMargins, private element: Element) {}

  width(context: Context, box: BoundingBox): number {
    const margins: Margins = toEnglish(this.margins);
    return this.element.width(context, box) + (margins.left + margins.right);
  }

  height(context: Context, box: BoundingBox): number {
    const margins: Margins = toEnglish(this.margins);
    return this.element.height(context, box) + (margins.top + margins.bottom);
  }

  draw(context: Context, _box: BoundingBox): void {
    const margins: Margins = toEnglish(this.margins);
    const elementWidth = this.element.width(context, _box);
    const elementHeight = this.element.height(context, _box);

    const elBox: BoundingBox = {
      x: _box.x + margins.left,
      y: _box.y + margins.top,
      width: elementWidth - (margins.left + margins.right),
      height: elementHeight - (margins.top + margins.bottom)
    };

    this.element.draw(context, elBox);
  }
}
