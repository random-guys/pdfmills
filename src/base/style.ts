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

export interface FlexStyle {
  display: "flex";
  /**
   * Margins for this layout if any
   */
  margin?: CSSMargins;
  /**
   * Background for this layout if any
   */
  background?: Drawable;
}

/**
 * How should each item use space around it
 */
export type FlexFloat = "left" | "right" | "none";
/**
 * What width should an item be
 */
export type FlexWidth = "flex" | "auto" | number;
