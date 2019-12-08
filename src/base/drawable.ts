import { BoundingBox } from "./bounding-box";
import { Context } from "./context";

/**
 * This is an object that can be drawn on a PDFKit document
 */
export interface Drawable {
  /**
   * Draw an object in a bounding box specified by `box`
   * @param doc PDFKit Document
   * @param box boundaries of the object being drawn
   */
  draw(context: Context, box: BoundingBox): void;
}
