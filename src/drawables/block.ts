import { BoundingBox, Context, Element, Layout } from '../base';
import sumBy = require('lodash/sumBy');

/**
 * This arranges all it's element on a vertical line using the width
 * of its bounding box.
 */
export class Block implements Layout {
  constructor(private elements: Element[]) {
    if (elements.length < 2) {
      throw new Error("You don't need this layout");
    }
  }

  width(context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    return this.elements.reduce((h, el) => {
      return h + el.height(context, box);
    }, 0);
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });

    const fullHeight = sumBy(boxes, b => b.height);
    context.reframe(0, fullHeight);
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const boxes: BoundingBox[] = [];

    for (const el of this.elements) {
      const height = el.height(context, box);

      boxes.push({ ...box, height });

      box.y += height;
      box.height -= height;
    }

    return boxes;
  }
}
