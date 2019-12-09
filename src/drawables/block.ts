import sumBy from "lodash/sumBy";
import { BoundingBox, Context, Element, Layout } from "../base";
import { Background } from "./background";

/**
 * This arranges all it's element on a vertical line using the width
 * of its bounding box.
 */
export class Block implements Layout {
  canSplit = true;

  /**
   * Create a new block layout.
   * @param elements list of elements to layout
   */
  constructor(private elements: Element[]) {}

  width(_context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    return sumBy(this.elements, e => e.height(context, box));
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, { ...box });

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const boxes: BoundingBox[] = [];
    let y = box.y;
    let remaningHeight = box.height;

    for (const el of this.elements) {
      const height = el.height(context, { ...box, y, height: remaningHeight });

      boxes.push({ ...box, y, height });

      y += height;
      remaningHeight -= height;
    }

    return boxes;
  }
}
