import { BoundingBox, Context, Element, FlexFloat } from "../base";
/**
 * This is a wrapper around element to allow configuration for flex
 * and interprete it for the calculation of width and height
 */
export class FlexItem implements Element {
  /**
   * Creates a new element with flex specific configuration
   * @param flexFloat how to allocate space at the sides of this element
   * @param flexWidth how to allocate extra width to this item
   * @param element element being wrapped
   */
  constructor(
    private element: Element,
    readonly flexFloat: FlexFloat[] = ["left", "right"],
    readonly itemWidth?: number
  ) {}

  width(context: Context, box: BoundingBox): number {
    return this.element.width(context, box);
  }

  height(context: Context, box: BoundingBox): number {
    // I do this mainly for paragraphs...as the width determines the height
    const width = this.width(context, box);
    return this.element.height(context, { ...box, width });
  }

  draw(context: Context, box: BoundingBox): void {
    return this.element.draw(context, box);
  }
}
