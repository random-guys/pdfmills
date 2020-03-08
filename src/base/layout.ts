import { BoundingBox } from "./bounding-box";
import { Element } from "./element";

/**
 * This is a layout that can span multiple pages
 */
export interface MultiPageLayout {
  /**
   * Element to be drawn on each new page. This is useful for things like
   * table headers
   */
  newPageElement?: Element;

  /**
   * Get all the child elements of this layout.
   */
  children(): Element[];
}
