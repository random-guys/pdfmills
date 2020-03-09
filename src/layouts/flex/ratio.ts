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
    const bounds = removeMargins(box, this.style.margin);
    const itemWidths = this.itemWidths(bounds);
    return Math.ceil(
      Math.max(
        ...this.items.map((item, i) =>
          item.height(context, { ...bounds, width: itemWidths[i] })
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

  private boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const bounds = removeMargins(box, this.style.margin);
    const itemWidths = this.itemWidths(bounds);

    const boxes = [];
    const y = bounds.y;
    const height = this.height(context, bounds);

    let x = bounds.x;

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
