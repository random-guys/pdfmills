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
   * background is any drawable to be drawn before actual page elements
   */
  background?: Drawable;
}

export interface TextStyle extends FontStyle {
  /**
   * background is any drawable to be drawn before drawing the text
   */
  background?: Drawable;
}

export interface ImageStyle {
  /**
   * width of image
   */
  width: number;
  /**
   * Height of image
   */
  height: number;
}

export interface LineBreakStyle {
  /**
   * height of space to leave
   */
  height: number;
}

export interface BlockStyle {
  display: "block";
  /**
   * Margins for this layout if any
   */
  margin?: CSSMargins;
  /**
   * Background for this layout if any
   */
  background?: Drawable;
}

export interface FlexLayout {
  display: "flex";
  /**
   * Margins for this layout if any
   */
  margin?: CSSMargins;
  /**
   * Background for this layout if any
   */
  background?: Drawable;
  /**
   * How should flex distribute the elements and the spaces inbetween them
   */
  strategy?: "auto";
}
