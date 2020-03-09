import { sum } from "lodash";
import memoize from "memoizee";
import { BoundingBox, Context, Element } from "../../base";
import { FlexItem } from "./item";

export class AutoFlex implements Element {
  constructor(private items: FlexItem[]) {
    this.width = memoize(this.width.bind(this));
    this.height = memoize(this.height.bind(this));
  }

  width(context: Context, box: BoundingBox) {
    return Math.max(...this.items.map(i => i.width(context, box)));
  }

  height(context: Context, box: BoundingBox) {
    return Math.max(
      ...this.items.map(i => {
        const width = i.width(context, box);
        return i.height(context, { ...box, width });
      })
    );
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, box);
    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  private boxes(context: Context, box: BoundingBox) {
    const itemWidths = [];
    let floatItemCount = 0;

    // check which margins the item has.
    this.items.forEach(i => {
      itemWidths.push(i.width(context, box));

      // this item has a left margin
      if (i.flexFloat.includes("left")) floatItemCount++;

      // this item has a right margin
      if (i.flexFloat.includes("right")) floatItemCount++;
    });

    const remainingSpace = box.width - sum(itemWidths);
    const floatSpace = remainingSpace / floatItemCount;

    let x = box.x;

    const y = box.y;
    const boxes: BoundingBox[] = [];
    const height = this.height(context, box);

    this.items.forEach((item, index) => {
      const width = itemWidths[index];

      // move the box to the left of the FloatSpace
      if (item.flexFloat.includes("left")) x += floatSpace;

      // this is where we are drawing the item
      boxes.push({ x, y, width, height });

      // offset the cursor by the item width
      x += width;

      // move the box to the right using the floatSpace
      if (item.flexFloat.includes("right")) x += floatSpace;
    });

    return boxes;
  }
}
