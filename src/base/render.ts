import { Element, Context, BoundingBox, pageBounds } from ".";

export class Renderer {
  protected box: BoundingBox;

  constructor(private context: Context) {
    this.box = pageBounds(context.margins);
  }

  render(elements: Element[]) {
    const boxes = [];
    let y = this.box.y;
    let remaningHeight = this.box.height;

    for (const el of elements) {
      if (typeof el.height !== "function") {
        boxes.push({ ...this.box });
        continue;
      }

      const height = el.height(this.context, {
        x: this.box.x,
        y,
        width: this.box.width,
        height: remaningHeight
      });

      boxes.push({ ...this.box, y, height });

      y += height;
      remaningHeight -= height;
    }

    elements.forEach((el, i) => {
      el.draw(this.context, boxes[i]);
    });
  }
}

export function render(context: Context, elements: Element[]): void {
  return new Renderer(context).render(elements);
}
