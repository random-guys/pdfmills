import sumBy from "lodash/sumBy";
import { BoundingBox, Context, Element, Layout } from "../base";

/**
 * Layout items horizontally with equal space between them
 */
export class SpaceBetween implements Layout {
  /**
   * Create a new flex layout with space between strategy. Do ensure to
   * use this with at least 2 child elements
   * @param elements list of elements to layout
   */
  constructor(private elements: Element[]) {
    if (elements.length < 2) {
      throw new Error("You don't need this layout");
    }
  }

  width(_context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    const width = box.width / this.elements.length;

    const heights = this.elements.map(e =>
      e.height(context, { ...box, width })
    );
    return Math.max(...heights);
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    this.elements.forEach((el, i) => {
      el.draw(context, boxes[i]);
    });
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const boxes: BoundingBox[] = [];
    const boundingBox = { ...box, width: box.width / this.elements.length };
    const actualLayoutWidth = sumBy(this.elements, e =>
      e.width(context, boundingBox)
    );
    const spacing =
      (box.width - actualLayoutWidth) / (this.elements.length - 1);
    const height = this.height(context, box);
    let x = box.x;

    for (const el of this.elements) {
      const width = el.width(context, boundingBox);

      boxes.push({ x, width, height, y: box.y });

      x += width + spacing;
    }

    return boxes;
  }
}

/**
 * `WeightedColumn` is a wrapper around an element to store weight
 * info for `WeightedRow`
 */
export interface WeightedColumn {
  /**
   * Percentage of width to be used by the element
   */
  weight: number;
  /**
   * Element being wrapped
   */
  element: Element;
}

/**
 * `WeightedRow` is a layout that arranges it's elements horizontally, determining
 * their widths solely on the weights specified.
 */
export class WeightedRow implements Layout {
  /**
   * Create a new weigthed row. For now it only works with integer
   * weights so I don't have to think of float issues. It is expected that
   * the sum of all the weights will be exactly 100
   * @param columns list of element and weight pairings
   */
  constructor(private columns: WeightedColumn[]) {
    if (columns.length < 1) {
      throw new Error("You don't need this layout");
    }

    // for now we can't work with floats
    this.columns.forEach(c => {
      c.weight = Math.floor(c.weight);
    });

    const totalWeight = sumBy(columns, "weight");
    if (totalWeight != 100) {
      throw new Error(`Weights dont add up to 100, got ${totalWeight}`);
    }
  }

  width(_context: Context, box: BoundingBox): number {
    return box.width;
  }

  height(context: Context, box: BoundingBox): number {
    const heights = this.columns.map(c => {
      const width = (c.weight / 100) * box.width;
      return c.element.height(context, { ...box, width });
    });
    return Math.max(...heights);
  }

  draw(context: Context, box: BoundingBox): void {
    const boxes = this.boxes(context, box);

    this.columns.forEach((c, i) => {
      c.element.draw(context, boxes[i]);
    });
  }

  boxes(context: Context, box: BoundingBox): BoundingBox[] {
    const boxes: BoundingBox[] = [];
    const height = this.height(context, box);
    let x = box.x;

    for (const col of this.columns) {
      const width = (col.weight / 100) * box.width;

      boxes.push({ x, width, height, y: box.y });

      x += width;
    }

    return boxes;
  }
}
