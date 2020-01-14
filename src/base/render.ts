import { Element, Context, BoundingBox, pageBounds } from ".";

export class Renderer {
  private box: BoundingBox;

  constructor(private context: Context) {
    this.resetMargins();
  }

  resetMargins() {
    this.box = pageBounds(this.context.margins);
  }

  render(elements: Element[]) {
    const boxes: BoundingBox[] = [];
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

      // check if we can draw the element on this page
      if (remaningHeight - height < 0) {
        y = this.box.y;
        remaningHeight = this.box.height;
      }

      // prep the coordinates for drawing
      boxes.push({ ...this.box, y, height });

      // calculate the next cursor location
      remaningHeight -= height;
      y += height;
    }

    elements.forEach((el, i) => {
      // check if there's enough space to draw the element
      // if there's space draw it, if there isn't add a new page.
      if (typeof el.height === "function") {
        this.reframe(0, boxes[i].height);
      }

      // draw the element
      el.draw(this.context, boxes[i]);
    });
  }

  /**
   * Move the bounding box by the left and top bar.
   * @param deltaX movement of the left bound
   * @param deltaY movement of the right bound
   */
  reframe(deltaX: number, deltaY: number) {
    this.box.x += deltaX;
    this.box.width -= deltaX;

    // check if the height of the new element will go out ouf bounds
    const newHeight = this.box.height - deltaY;
    if (newHeight < 0) {
      this.context.addPage();

      // reset the PDF file margins and the box
      this.resetMargins();
    }

    this.box.y += deltaY;
    this.box.height -= deltaY;
  }
}

export function render(context: Context, elements: Element[]): void {
  return new Renderer(context).render(elements);
}
