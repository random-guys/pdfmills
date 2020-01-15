import {
  BoundingBox,
  Context,
  Element,
  FlexFloat,
  FlexStyle,
  FlexWidth,
  Layout,
  removeMargins
} from "../base";

export class Flex implements Layout {
  constructor(private style: FlexStyle, private items: FlexItem[]) {}

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height(context: Context, box: BoundingBox) {
    return Math.max(...this.items.map(i => i.height(context, box)));
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, { ...box });

    if (this.style.background) {
      this.style.background.draw(context, box);
    }

    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  boxes(context: Context, box: BoundingBox) {
    box = removeMargins(box, this.style.margin);

    let originalWidth = 0;
    let floatItemCount = 0;
    let floatSpace = 0;

    this.items.forEach(i => {
      originalWidth += i.width(context, box);
      if (i.flexFloat !== "none") {
        floatItemCount++;
      }
    });

    const remainingSpace = box.width - originalWidth;
    floatSpace = remainingSpace / floatItemCount;

    const boxes: BoundingBox[] = [];
    const height = this.height(context, box);
    const y = box.y;

    let x = box.x;

    for (const i of this.items) {
      const width = i.width(context, box);
      if (i.flexFloat === "left") {
        x += floatSpace;
      }

      boxes.push({ x, y, width, height });

      x += width + (i.flexFloat === "right" ? floatSpace : 0);
    }

    return boxes;
  }
}

/**
 * This is a wrapper around element to allow configuration for flex
 * and interprete it for the calculation of width and height
 */
export class FlexItem implements Element {
  /**
   * Creates a new element with flex specific configuration
   * @param flexFloat how to allocate space at the sides of this element
   * @param flexWidth how to allocate extra width to this item
   * @param element element being wrapped
   */
  constructor(
    readonly flexFloat: FlexFloat = "none",
    private element: Element
  ) {}

  width(context: Context, box: BoundingBox): number {
    return this.element.width(context, box);
  }

  height(context: Context, box: BoundingBox): number {
    // I do this mainly for paragraphs...as the width determines the height
    const width = this.width(context, box);
    return this.element.height(context, { ...box, width });
  }

  draw(context: Context, box: BoundingBox): void {
    return this.element.draw(context, box);
  }
}

/**
 * Factory function for creating a new flex layout.
 * @param style background and margin for the row
 * @param elements list of elements to layout with their flex configuration
 */
export function row(style: FlexStyle, ...elements: FlexItem[]) {
  return new Flex(style, elements);
}

/**
 * Factory function for creating a new flex item.
 * @param style flex configuration of the itme
 * @param element element being wrapped
 */
export function col(float: FlexFloat = "none", element: Element) {
  return new FlexItem(float, element);
}
