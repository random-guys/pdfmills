import {
  Element,
  FlexStyle,
  FlexFloat,
  ColorValue,
  ElementBackground
} from "..";
import { FlexItem } from "./FlexItem";
import { RatioFlex } from "./flex-ratio";
import { Background } from "./background";
import { EqualFlex } from "./flex-equal";

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
  if (params.ratios) {
    return new RatioFlex(params.style, params.ratios, params.elements);
  } else return new EqualFlex(params.style, params.elements);
}

/**
 * Factory function for creating a new flex item.
 * @param style flex configuration of the itme
 * @param element element being wrapped
 */
export function col(element: Element, float: FlexFloat[] = ["left", "right"]) {
  return new FlexItem(element, float);
}

/**
 *
 * @param color the background color
 */
export function bg(color: ColorValue, element?: Element) {
  if (element) return new ElementBackground(color, element);
  else return new Background(color);
}
