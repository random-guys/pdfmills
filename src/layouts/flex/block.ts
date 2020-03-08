import { BoundingBox, Context, removeMargins } from "../../base";
import { Block } from "../block";

/**
 * This is like a normal `Block` but with its width sourced from
 * its children
 */
export class FlexBlock extends Block {
  width(context: Context, box: BoundingBox): number {
    return Math.max(...this.elements.map(i => i.width(context, box)));
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    box = removeMargins(box, this.style.margin);

    const boxes: BoundingBox[] = [];

    let y = box.y;
    let remaningHeight = box.height;
    const width = this.width(context, box);

    for (const el of this.elements) {
      const height = el.height(context, {
        y,
        width,
        x: box.x,
        height: remaningHeight
      });

      boxes.push({ ...box, y, height });

      y += height;
      remaningHeight -= height;
    }

    return boxes;
  }
}
