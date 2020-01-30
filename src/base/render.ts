import { Element, Context, BoundingBox, pageBounds } from ".";
import { Table } from "../layouts";
import { LineBreak } from "../elements";

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

    // check if the element is a table
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el instanceof Table) {
        elements.push(...el.rows());
        elements.splice(i, 1);
        break;
      }
    }

    for (const el of elements) {
      // @ts-ignore
      if (!(el instanceof LineBreak) && el.elements[0]) {
        // @ts-ignore
        console.log(el.elements[0].items.map(it => it.element.text));
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
      this.reframe(0, boxes[i].height);

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
