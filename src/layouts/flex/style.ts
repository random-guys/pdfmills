import { Drawable } from "../../base";
import { CSSMargins } from "../../utils";

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
