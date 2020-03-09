import memoize from "memoizee";
import { BoundingBox, Context, Element } from "../../base";
import { ItemWidthError } from "../../errors";
import { FlexItem } from "./item";

export class FixedFlex implements Element {
  constructor(private items: FlexItem[]) {
    if (items.some(it => !it.itemWidth)) {
      throw new ItemWidthError();
    }

    this.height = memoize(this.height.bind(this));
  }

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height(context: Context, box: BoundingBox) {
    return Math.max(
      ...this.items.map(i => i.height(context, { ...box, width: i.itemWidth }))
    );
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, { ...box });
    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  private boxes(context: Context, box: BoundingBox) {
    let originalWidth = 0;
    let floatItemCount = 0;
    let floatSpace = 0;

    // check which margins the item has.
    this.items.forEach(i => {
      originalWidth += i.itemWidth;

      // this item has a left margin
      if (i.flexFloat.includes("left")) floatItemCount++;

      // this item has a right margin
      if (i.flexFloat.includes("right")) floatItemCount++;
    });

    const remainingSpace = box.width - originalWidth;
    floatSpace = remainingSpace / floatItemCount;

    const boxes: BoundingBox[] = [];
    const y = box.y;
    const height = this.height(context, box);
    let x = box.x;

    for (const i of this.items) {
      const width = i.itemWidth;

      // move the box to the left of the FloatSpace
      if (i.flexFloat.includes("left")) x += floatSpace;

      // this is where we are drawing the item
      boxes.push({ x, y, width, height });

      // offset the cursor by the item width
      x += width;

      // move the box to the right with half the FloatSpace
      if (i.flexFloat.includes("right")) x += floatSpace;
    }

    return boxes;
  }
}
