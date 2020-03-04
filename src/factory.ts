import {
  BlockStyle,
  Context,
  Element,
  FlexFloat,
  FlexStyle,
  Layout,
  Renderer
} from "./base";
import { Background, ElementBackground } from "./elements";
import { Block, Flex, FlexItem, Padding, RatioFlex, Table } from "./layouts";
import { ColorValue, CSSMargins } from "./utils";

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
  } else return new Flex(params.style, params.elements);
}

/**
 * Factory function for creating a new flex item.
 * @param style flex configuration of the itme
 * @param element element being wrapped
 */
export function col(
  element: Element,
  float: FlexFloat[] = ["left", "right"],
  itemWidth?: number
) {
  return new FlexItem(element, float, itemWidth);
}

/**
 *
 * @param color the background color
 */
export function bg(color: ColorValue, element?: Element) {
  if (element) return new ElementBackground(color, element);
  else return new Background(color);
}

/**
 *
 * @param margins CSS Margins
 * @param element The element being wrapped
 */
export function pad(margins: CSSMargins, element: Element) {
  return new Padding(margins, element);
}

/**
 * Factory function for creating a new block layout.
 * @param style background and margin for the block
 * @param rows list of elements to layout
 */
export function table(style: BlockStyle, ...rows: Layout[]) {
  return new Table(style, rows);
}

/**
 * Factory function for creating a new block layout.
 * @param style background and margin for the block
 * @param elements list of elements to layout
 */
export function div(style: BlockStyle, ...elements: Element[]) {
  return new Block(style, elements);
}

/**
 * Creates a new renderer that calculates the boxes
 * needed to draw items and actually draws them.
 *
 * @param context the global state of the PDF Document
 * @param elements list of elements to layout
 */
export function render(context: Context, elements: Element[]) {
  return new Renderer(context).render(elements);
}
