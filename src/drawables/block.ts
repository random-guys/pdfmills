import sumBy from "lodash/sumBy";
import { BoundingBox, Context, Element, Layout } from "../base";
import { Background } from "./background";

/**
 * This arranges all it's element on a vertical line using the width
 * of its bounding box.
 */
export class Block implements Layout {
  /**
   * Create a new block layout.
   * @param elements list of elements to layout
   */
  constructor(private elements: Element[], private background?: Background) {}

  width(_context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    return sumBy(this.elements, e => e.height(context, box));
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, { ...box });

    if (this.background) {
      this.background.draw(context, box);
    }

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });
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
