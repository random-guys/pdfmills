import { BoundingBox, Context, Element, pageBounds } from "./base";
import {
  Background,
  Block,
  SpaceBetween,
  WeightedColumn,
  WeightedRow
} from "./drawables";

export function block(context: Context, elements: Element[]) {
  const block = new Block(elements);
  block.draw(context, context.bounds());
  return block;
}

export function spaceBetween(context: Context, elements: Element[]) {
  const flex = new SpaceBetween(elements);
  flex.draw(context, context.bounds());
  return flex;
}

export function weightedRow(context: Context, columns: WeightedColumn[]) {
  const row = new WeightedRow(columns);
  row.draw(context, context.bounds());
  return row;
}

export function background(context: Context, box?: BoundingBox) {
  const bg = new Background(251);
  bg.draw(context, box || pageBounds());

  return bg;
}
