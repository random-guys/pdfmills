import { BoundingBox, Context, pageBounds } from ".";
import { Element } from "./element";
import { MultiPageLayout } from "./layout";

export type Renderable = Element | MultiPageLayout;

export class Renderer {
  private box: BoundingBox;

  constructor(private context: Context) {}

  isMultipage(renderable: Renderable) {
    return (
      renderable["children"] && typeof renderable["children"] === "function"
    );
  }

  render(renderables: Renderable[]) {
    const page = pageBounds(this.context.margins);

    let x = page.x,
      y = page.y;
    let width = page.width,
      remainingHeight = page.height;

    const moveDown = (height: number) => {
      y += height;
      remainingHeight -= height;
    };

    const resetCoords = () => {
      y = page.y;
      remainingHeight = page.height;
    };

    const newBox = (): BoundingBox => {
      return { x, y, width, height: remainingHeight };
    };

    renderables.forEach(renderable => {
      if (this.isMultipage(renderable)) {
        const layout = renderable as MultiPageLayout;

        if (layout.newPageElement) {
          const height = layout.newPageElement.height(this.context, page);
          this.context.onNewPage(() => {
            // draw the new page element first
            layout.newPageElement.draw(this.context, newBox());
            moveDown(height);
          });

          if (height <= remainingHeight) {
            // draw the first instance of the new page element since we are
            // already on one
            layout.newPageElement.draw(this.context, newBox());
            moveDown(height);
          } else {
            // or start on a new page
            this.context.addPage();
            resetCoords();
          }
        }

        // draw the multipage's children
        const children = layout.children();
        children.forEach(element => {
          const height = element.height(this.context, page);

          // start on a new page if there's no space left
          if (height > remainingHeight) {
            this.context.addPage();
            resetCoords();
          }

          element.draw(this.context, newBox());

          // move the coords down
          moveDown(height);
        });

        return;
      }

      const element = renderable as Element;
      const height = element.height(this.context, page);

      // start on a new page if there's no space left
      if (height > remainingHeight) {
        this.context.addPage();
        resetCoords();
      }

      element.draw(this.context, { x, y, width, height });

      // move the coords down
      moveDown(height);
    });
  }
}
