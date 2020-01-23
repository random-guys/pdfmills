import { BlockStyle, Layout, Context, BoundingBox, removeMargins } from "..";

/**
 * A table is basically a `block`without a definite height
 */
export class Table implements Layout {
  /**
   *
   * @param style the block style
   * @param body the rows of the table
   */
  constructor(private style: BlockStyle, private body: Layout[]) {}

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    box = removeMargins(box, this.style.margin);

    const boxes: BoundingBox[] = [];

    let y = box.y;
    let remaningHeight = box.height;

    for (const el of this.body) {
      const height = el.height(context, {
        x: box.x,
        y,
        width: box.width,
        height: remaningHeight
      });

      boxes.push({ ...box, y, height });

      y += height;
      remaningHeight -= height;
    }

    return boxes;
  }

  width(_: Context, box: BoundingBox): number {
    return box.width;
  }

  height(_: Context, box: BoundingBox): number {
    return box.height;
  }

  rows() {
    return this.body;
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    // draw the table body
    this.body.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });
  }
}
