import { BoundingBox, Context, Element } from "../base";

/**
 * `Image` is the equivalent of `<img />`
 */
export class Image implements Element {
  /**
   * Create a new image without drawing it
   * @param src path to the source image. For the sake of everyone involved please use an
   * absolute path
   * @param w width of the image
   * @param h height of the image
   */
  constructor(private src: string, private w: number, private h: number) {}

  width() {
    return this.w;
  }

  height() {
    return this.h;
  }

  draw(context: Context, box: BoundingBox): void {
    context.raw.image(this.src, box.x, box.y, {
      fit: [this.w, this.h]
    });
  }
}
