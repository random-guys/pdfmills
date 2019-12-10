import { Background } from "./background";
import { BoundingBox, Context, Element, pageBounds } from "./base";
import { Block, SpaceBetween, WeightedColumn, WeightedRow } from "./layouts";
import { ColorValue } from "./utils";

/**
 * Draw a block of elements and update the context
 * @param context PDF context
 * @param elements elements to draw in a block
 */
export function block(context: Context, elements: Element[]) {
  const block = new Block(elements);
  block.draw(context, context.bounds());
  context.reframe(0, block.height(context, context.bounds()));
  return block;
}

/**
 * Draw the given elements horizontally using `space-between` and
 * update the context
 * @param context PDF context
 * @param elements elements to draw in a block
 */
export function spaceBetween(context: Context, elements: Element[]) {
  const flex = new SpaceBetween(elements);
  flex.draw(context, context.bounds());
  context.reframe(0, flex.height(context, context.bounds()));
  return flex;
}

/**
 * Draw the given elements horizontally using the given percentages and
 * update the context
 * @param context PDF context
 * @param elements elements to draw in a block
 */
export function weightedRow(context: Context, columns: WeightedColumn[]) {
  const row = new WeightedRow(columns);
  row.draw(context, context.bounds());
  context.reframe(0, row.height(context, context.bounds()));
  return row;
}

/**
 * Draw a background color for the given box
 * @param context PDF context
 * @param color color to use as background
 * @param box bounded box to draw the background into. If not given it will draw
 * the background on the entire page
 */
export function background(
  context: Context,
  color: ColorValue,
  box?: BoundingBox
) {
  const bg = new Background(color);
  bg.draw(context, box || pageBounds());

  return bg;
}
