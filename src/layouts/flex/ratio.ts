import { sum } from "lodash";
import memoize from "memoizee";
import { BoundingBox, Context, Element } from "../../base";
import { RatioMissingError, RatioSumError } from "../../errors";
import { truncate } from "../../utils";
import { FlexItem } from "./item";

/**
 * Creates a row that draws columns based on the ratio passed
 */
export class RatioFlex implements Element {
  constructor(private ratios: number[], private items: FlexItem[]) {
    if (items.length !== ratios.length) throw new RatioMissingError();
    if (sum(this.ratios) !== 100) throw new RatioSumError();

    this.height = memoize(this.height.bind(this));
    this.itemWidths = memoize(this.itemWidths.bind(this));
  }

  width(_context: Context, box: BoundingBox) {
    return box.width;
  }

  itemWidths(box: BoundingBox) {
    return this.ratios.map(x => truncate((x / 100) * box.width));
  }

  height(context: Context, box: BoundingBox) {
    const itemWidths = this.itemWidths(box);
    return Math.ceil(
      Math.max(
        ...this.items.map((item, i) =>
          item.height(context, { ...box, width: itemWidths[i] })
        )
      )
    );
  }

  draw(context: Context, box: BoundingBox) {
    const boxes = this.boxes(context, box);
    this.items.forEach((i, c) => {
      i.draw(context, boxes[c]);
    });
  }

  private boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const itemWidths = this.itemWidths(box);

    const boxes = [];
    const y = box.y;
    const height = this.height(context, box);

    let x = box.x;

    this.items.forEach((_, i) => {
      const width = itemWidths[i];

      // this is where we are drawing the item
      boxes.push({ x, y, width, height });

      // offset the cursor by the item width
      x += width;
    });

    return boxes;
  }
}
