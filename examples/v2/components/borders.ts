import {
  BoundingBox,
  ColorValue,
  Context,
  Element,
  getRGB
} from "../../../src";

export class BorderBottom implements Element {
  constructor(
    private color: ColorValue,
    private element: Element,
    private borderWidth = 1
  ) {}

  height(context: Context, box: BoundingBox): number {
    return this.element.height(context, box);
  }

  width(context: Context, box: BoundingBox): number {
    return this.element.width(context, box);
  }

  draw(context: Context, box: BoundingBox): void {
    const width = this.element.width(context, box);
    const height = this.element.height(context, box);

    const bottom = box.y + height - this.borderWidth;

    context.raw.lineWidth(this.borderWidth);
    context.raw
      .moveTo(box.x, bottom)
      .lineTo(box.x + width, bottom)
      .strokeColor(getRGB(this.color))
      .stroke();

    this.element.draw(context, box);
  }
}

export class DashedBorderBottom extends BorderBottom {
  constructor(
    color: ColorValue,
    element: Element,
    private dash = 1,
    borderWidth = 1
  ) {
    super(color, element, borderWidth);
  }

  draw(context: Context, box: BoundingBox) {
    context.raw.dash(this.dash, { space: this.dash });
    super.draw(context, box);
  }
}

export function bb(color: ColorValue, element: Element) {
  return new BorderBottom(color, element);
}

export function dbb(color: ColorValue, element: Element) {
  return new DashedBorderBottom(color, element);
}
