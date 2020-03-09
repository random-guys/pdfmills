import memoize from "memoizee";
import { BoundingBox, Context, Element } from "../../base";
import { FlexItem } from "./item";

/**
 * Creates a row that draws columns giving them equal spacing
 */
export class EqualFlex implements Element {
  constructor(private items: FlexItem[]) {
    this.height = memoize(this.height.bind(this));
  }

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height(context: Context, box: BoundingBox) {
    // we must factor in the width if the individual items when getting their heigth
    const width = box.width / this.items.length;
    return Math.ceil(
      Math.max(...this.items.map(i => i.height(context, { ...box, width })))
    );
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, { ...box });
    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  private boxes(context: Context, box: BoundingBox) {
    const sharedWidth = box.width / this.items.length;
    const height = this.height(context, { ...box, width: sharedWidth });
    const boxes = [];
    const y = box.y;

    let x = box.x;

    for (const _ of this.items) {
      const width = sharedWidth;

      // this is defines the confines of the item
      boxes.push({ x, y, width, height });

      // offset the cursor by the item width
      x += width;
    }

    return boxes;
  }
}
