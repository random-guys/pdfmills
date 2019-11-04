import sumBy from 'lodash/sumBy';
import { BoundingBox, Context, Element, pageBounds } from './base';
import { Background, Block, SpaceBetween } from './drawables';

export function block(context: Context, elements: Element[]) {
  const block = new Block(elements);
  const boxes = block.boxes(context, context.bounds());

  elements.forEach((el, i) => {
    el.draw(context, boxes[i]);
  });

  const fullHeight = sumBy(boxes, b => b.height);
  context.reframe(0, fullHeight);

  return block;
}

export function spaceBetween(context: Context, elements: Element[]) {
  const flex = new SpaceBetween(elements);
  const boxes = flex.boxes(context, context.bounds());

  elements.forEach((el, i) => {
    el.draw(context, boxes[i]);
  });

  context.reframe(0, boxes[0].height);

  return flex;
}

export function background(context: Context, box?: BoundingBox) {
  box = box || pageBounds();
  const bg = new Background(251);
  bg.draw(context, box);

  return bg;
}
