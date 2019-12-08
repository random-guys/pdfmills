import { Context } from "./context";
import { BoundingBox } from "./bounding-box";
import { Element } from "./element";

/**
 * A layout is an element that can generate a list of
 * bounding boxes.
 */
export interface Layout extends Element {
  /**
   * Calculate bounding boxes for all its elements
   * @param context source of document state
   * @param box boundaries of the layout
   */
  boxes(context: Context, box: BoundingBox): BoundingBox[];
}
