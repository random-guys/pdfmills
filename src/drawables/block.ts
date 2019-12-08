import sumBy from "lodash/sumBy";
import { BoundingBox, Context, Element, Layout } from "../base";

/**
 * This arranges all it's element on a vertical line using the width
 * of its bounding box.
 */
export class Block implements Layout {
  /**
   * Create a new block layout. Do ensure to use this with at
   * least 2 child elements
   * @param elements list of elements to layout
   */
  constructor(private elements: Element[]) {
    if (elements.length < 2) {
      throw new Error("You don't need this layout");
    }
  }

  width(_context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    return sumBy(this.elements, e => e.height(context, box));
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });

    context.reframe(0, sumBy(boxes, "height"));
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
