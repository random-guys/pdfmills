import { Element, FlexStyle, FlexFloat } from "..";
import { FlexItem } from "./FlexItem";
import { EqualFlex } from "./flex-equal";
import { RatioFlex } from "./flex-ratio";

export interface RowParams {
  style: FlexStyle;
  ratios?: number[];
  elements: FlexItem[];
}

/**
 * Factory function for creating a new flex layout.
 * @param style background and margin for the row
 * @param elements list of elements to layout with their flex configuration
 */
export function row(params: RowParams) {
  if (params.ratios)
    return new RatioFlex(params.style, params.ratios, params.elements);
  else return new EqualFlex(params.style, params.elements);
}

/**
 * Factory function for creating a new flex item.
 * @param style flex configuration of the itme
 * @param element element being wrapped
 */
export function col(element: Element, float: FlexFloat[] = ["left", "right"]) {
  return new FlexItem(element, float);
}
