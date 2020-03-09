import { Context, ContextParams, Element, Renderable, Renderer } from "./base";
import {
  Background,
  ElementBackground,
  Image,
  ImageBackground,
  ImageStyle,
  LineBreak,
  Padding,
  Paragraph
} from "./elements";
import {
  AutoFlex,
  Block,
  FixedFlex,
  FlexBlock,
  FlexFloat,
  FlexItem,
  RatioFlex,
  Table
} from "./layouts";
import { ColorValue, CSSMargins, FontStyle } from "./utils";

export interface RowParams {
  ratios?: number[];
  elements: FlexItem[];
}

/**
 * Factory function for creating a new flex layout.
 * @param elements list of elements to layout with their flex configuration
 */
export function row(params: RowParams) {
  if (params.ratios) {
    return new RatioFlex(params.ratios, params.elements);
  } else return new FixedFlex(params.elements);
}

/**
 * Factory function for creating a new flex layout with automatic width.
 * @param elements list of elements to layout with their flex configuration
 */
export function autoRow(elements: FlexItem[]) {
  return new AutoFlex(elements);
}

/**
 * Factory function for creating a new flex item.
 * @param style flex configuration of the itme
 * @param element element being wrapped
 */
export function col(
  element: Element,
  float: FlexFloat[] = ["none"],
  itemWidth?: number
) {
  return new FlexItem(element, float, itemWidth);
}

/**
 * Create a background drawable or give an element
 * some background
 * @param color the background color
 */
export function bg(color: ColorValue, element?: Element) {
  if (element) return new ElementBackground(color, element);
  else return new Background(color);
}

/**
 * Create an image background
 * @param src path to the image
 */
export function imgBg(src: string) {
  return new ImageBackground(src);
}

/**
 * Add margins to an element
 * @param margins CSS Margins
 * @param element The element being wrapped
 */
export function pad(margins: CSSMargins, element: Element) {
  return new Padding(margins, element);
}

/**
 * Factory function for creating tables
 * @param header table header
 * @param data items to put in rows
 * @param mapper converts an item to a row element
 */
export function table<T>(
  header: Element,
  data: T[],
  mapper: (t: T) => Element
) {
  return new Table({
    header,
    data,
    rowMapper: mapper
  });
}

/**
 * Factory function for creating a new block layout.
 * @param elements list of elements to layout
 */
export function div(elements: Element[]) {
  return new Block(elements);
}

/**
 * Factory function for creating a new block layout that can reside
 * in an `AutoFlex` layout.
 * @param elements list of elements to layout
 */
export function flexDiv(elements: Element[]) {
  return new FlexBlock(elements);
}

/**
 * Factory function for images
 * @param src path to the source image. For the sake of everyone involved please use an
 * absolute path
 * @param style configuration for the image
 */
export function img(src: string, style: ImageStyle) {
  return new Image(src, style);
}

/**
 * Factory function to create a new line break
 * @param height height of vertical space in px
 */
export function br(height: number) {
  return new LineBreak({ height });
}

/**
 * Factory function for `Paragraph`
 * @param text string to be written
 * @param style font and color to use. Note that the font and font
 * size affect the `real` width and height of the text element
 */
export function p(text: string, style?: FontStyle) {
  return new Paragraph(text, style);
}

/**
 * Creates a new renderer that calculates the boxes
 * needed to draw items and actually draws them.
 *
 * @param context the global state of the PDF Document
 * @param renderables list of elements or layouts to render
 */
export function render(context: Context, renderables: Renderable[]) {
  return new Renderer(context).render(renderables);
}

/**
 * Creates a new Context
 * @param params context config params
 */
export function configure(params: ContextParams) {
  return new Context(params);
}
