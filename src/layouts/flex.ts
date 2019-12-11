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

    let flexedItemCount = 0;
    let floatItemCount = 0;

    let flexSpace = 0;
    let floatSpace = 0;

    this.items.forEach(i => {
      originalWidth += i.width(context, box);

      if (i.flexWidth === "flex") {
        flexedItemCount++;
      } else if (i.flexFloat !== "none") {
        floatItemCount++;
      }
    });

    const remainingSpace = box.width - originalWidth;

    if (flexedItemCount > 0) {
      flexSpace = remainingSpace / flexedItemCount;
    } else {
      floatSpace = remainingSpace / floatItemCount;
    }

    const boxes: BoundingBox[] = [];
    const height = this.height(context, box);
    const y = box.y;

    let x = box.x;

    for (const i of this.items) {
      const width =
        i.flexWidth === "flex"
          ? i.width(context, box) + flexSpace
          : i.width(context, box);
      if (i.flexFloat === "left") {
        x += floatSpace;
      }

      boxes.push({ x, y, width, height });

      x += width + (i.flexFloat === "right" ? floatSpace : 0);
    }

    return boxes;
  }
}

export class FlexItem implements Element {
  constructor(
    readonly flexFloat: FlexFloat = "none",
    readonly flexWidth: FlexWidth = "auto",
    private element: Element
  ) {}

  width(context: Context, box: BoundingBox): number {
    if (typeof this.flexWidth === "number") {
      return this.element.width(context, { ...box, width: this.flexWidth });
    }
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
