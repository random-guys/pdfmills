import { CSSMargins, FontStyle } from "../utils";
import { Drawable } from "./drawable";

/**
 * Styling for each page on the PDF document
 */
export interface DocumentStyle extends FontStyle {
  /**
   * margins for each page on the document
   */
  margin?: CSSMargins;
  /**
   * Use this to draw on each page before the elements are added
   */
  background?: Drawable;
}
