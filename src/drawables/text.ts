import { BoundingBox, Context, Element } from '../base';
import { FontConfig } from '../utils';

export class Text implements Element {
  constructor(private text: string, private config?: FontConfig) {}

  width(context: Context, box: BoundingBox): number {
    return context.withFont(this.config, () => {
      return context.raw.widthOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  height(context: Context, box: BoundingBox): number {
    return context.withFont(this.config, () => {
      return context.raw.widthOfString(this.text, {
        width: box.width,
        height: box.height
      });
    });
  }

  draw(context: Context, box: BoundingBox): void {
    context.withFont(this.config, () => {
      return context.raw.text(this.text, box.x, box.y, {
        width: box.width,
        height: box.height
      });
    });
  }
}
