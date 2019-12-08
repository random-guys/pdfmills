import { Layout, Context, BoundingBox, Element } from "../base";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";

/**
 * Layout items horizontally with equal space between them
 */
export class SpaceBetween implements Layout {
  constructor(private elements: Element[]) {
    if (elements.length < 2) {
      throw new Error("You don't need this layout");
    }
  }

  width(context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    const width = box.width / this.elements.length;
    const heights = this.elements.map(e =>
      e.height(context, { ...box, width })
    );
    return Math.max(...heights);
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });

    context.reframe(0, boxes[0].height);
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const boxes: BoundingBox[] = [];
    const boundingBox = { ...box, width: box.width / this.elements.length };
    const actualLayoutWidth = sumBy(this.elements, e =>
      e.width(context, boundingBox)
    );
    const spacing =
      (box.width - actualLayoutWidth) / (this.elements.length - 1);
    const height = this.height(context, box);

    for (const el of this.elements) {
      const width = el.width(context, boundingBox);

      boxes.push({ ...box, width, height });

      box.x += width + spacing;
      box.width -= width + spacing;
    }

    return boxes;
  }
}
