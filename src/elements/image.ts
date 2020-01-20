import { BoundingBox, Context, Element, ImageStyle } from "../base";

/**
 * `Image` is the equivalent of `<img />`
 */
export class Image implements Element {
  name: string = "Image";

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

/**
 * Factory function for images
 * @param src path to the source image. For the sake of everyone involved please use an
 * absolute path
 * @param style configuration for the image
 */
export function img(src: string, style: ImageStyle) {
  return new Image(src, style);
}
