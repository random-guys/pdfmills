import { BoundingBox, Context, Element } from "../base";

export interface ImageStyle {
  /**
   * width of image
   */
  width: number;
  /**
   * Height of image
   */
  height: number;
}

/**
 * `Image` is the equivalent of `<img />`
 */
export class Image implements Element {
  /**
   * Create a new image without drawing it
   * @param src path to the source image. For the sake of everyone involved please use an
   * absolute path
   * @param style configuration for the image
   */
  constructor(private src: string, private style: ImageStyle) {}

  width() {
    return this.style.width;
  }

  height() {
    return this.style.height;
  }

  draw(context: Context, box: BoundingBox): void {
    context.raw.image(this.src, box.x, box.y, {
      fit: [this.style.width, this.style.height]
    });
  }
}
