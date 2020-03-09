import { Margins, toEnglish, CSSMargins } from "../utils";

export const A4_WIDTH = 595;
export const A4_HEIGHT = 842;

/**
 * Boundaries of an object
 */
export interface BoundingBox {
  /**
   * Horizontal postion from the left
   */
  x: number;
  /**
   * Vertical position from the top
   */
  y: number;
  /**
   * Width in pixels
   */
  width: number;
  /**
   * Height in pixels
   */
  height: number;
}

/**
 * Vertical space afforded by a bounding box
 * @param box McSource
 */
export function verticalSpace(box: BoundingBox) {
  return box.y + box.height;
}

/**
 * Create a bounding box for an entire A4 page taking account
 * of the margins if present.
 * @param margins page margins
 */
export function pageBounds(margins?: Margins): BoundingBox {
  margins = margins || toEnglish();
  return {
    x: margins.left,
    y: margins.right,
    width: A4_WIDTH - (margins.left + margins.right),
    height: A4_HEIGHT - (margins.top + margins.bottom)
  };
}

/**
 * Create a bounding box for an entire A4 page
 */
export function fullPageBounds(): BoundingBox {
  return { x: 0, y: 0, width: A4_WIDTH, height: A4_HEIGHT };
}

/**
 * Resize the box based on the given margins
 * @param box box to be resized
 * @param margins margins to use to resize
 */
export function removeMargins(box: BoundingBox, margins?: CSSMargins) {
  const english = toEnglish(margins);
  return {
    x: box.x + english.left,
    y: box.y + english.top,
    width: box.width - (english.left + english.right),
    height: box.height - (english.top + english.bottom)
  };
}
