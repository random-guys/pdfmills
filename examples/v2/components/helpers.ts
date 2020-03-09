import { col, Element, FlexItem, pad, row } from "../../../src";

export const tableRow = (ratios: number[], elements: FlexItem[]) =>
  row({ elements, ratios });

export const flexBR = (margin: number, element: Element) =>
  pad([0, 0, margin, 0], element);

export const column = (width: number, element: Element) =>
  col(element, ["none"], width);
