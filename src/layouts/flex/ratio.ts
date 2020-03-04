import { sum } from "lodash";
import {
  BoundingBox,
  Context,
  FlexStyle,
  Layout,
  removeMargins
} from "../../base";
import { RatioMissingError, RatioSumError } from "../../errors";
import { toFixed } from "../../utils";
import { FlexItem } from "./item";

/**
 * Creates a row that draws columns based on the ratio passed
 */
export class RatioFlex implements Layout {
  constructor(
    private style: FlexStyle,
    private ratios: number[],
    private items: FlexItem[]
  ) {
    if (items.length !== ratios.length) throw new RatioMissingError();
    if (sum(this.ratios) !== 100) throw new RatioSumError();
  }

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  height(context: Context, box: BoundingBox) {
    const ratioMap = this.getRatioMap(box);
    return Math.floor(
      Math.max(
        ...this.items.map((item, i) =>
          item.height(context, { ...box, width: ratioMap[i] })
        )
      )
    );
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, { ...box });

    this?.style?.background?.draw(context, box);

    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  getRatioMap(box: BoundingBox) {
    const ratioSum = sum(this.ratios);
    return this.ratios.map(it => toFixed((it / ratioSum) * box.width));
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    box = removeMargins(box, this.style.margin);

    let originalWidth = 0;
    let floatItemCount = 0;
    let floatSpace = 0;
    const ratioMap = this.getRatioMap(box);

    // check which margins the item has.
    this.items.forEach((item, i) => {
      originalWidth += ratioMap[i];

      // this item has a left margin
      if (item.flexFloat.includes("left")) floatItemCount++;

      // this item has a right margin
      if (item.flexFloat.includes("right")) floatItemCount++;
    });

    const remainingSpace = box.width - originalWidth;
    floatSpace = remainingSpace / floatItemCount;

    const boxes: BoundingBox[] = [];
    const y = box.y;

    let x = box.x;

    this.items.forEach((item, i) => {
      const width = ratioMap[i];
      const height = this.height(context, { ...box, width });

      // move the box to the left of the FloatSpace
      if (item.flexFloat.includes("left")) x += floatSpace;

      // this is where we are drawing the item
      boxes.push({ x, y, width, height });

      // offset the cursor by the item width
      x += width;

      // move the box to the right with half the FloatSpace
      if (item.flexFloat.includes("right")) x += floatSpace;
    });

    return boxes;
  }
}
