import { Drawable } from "./drawable";
import { BoundingBox } from "./bounding-box";
import { Context } from "./context";

/**
 * This is drawable that has width and height, such that
 * `width` and `height` return the same value before and after
 * `draw`
 */
export interface Element extends Drawable {
  /**
   * Calculate the real width of an element
   * @param context gives the element access to the document context
   * @param box bounding box of the element. i.e width cannot be wider than
   * the bounding box
   */
  width(context: Context, box: BoundingBox): number;
  /**
   * Calculate the real height of an element
   * @param context gives the element access to the document context
   * @param box bounding box of the element. i.e height cannot be more than
   * the bounding box's height
   */
  height(context: Context, box: BoundingBox): number;
}
