import { Origins, Dimensions } from './data';

export class Block {
  private elements: BlockElement[] = [];

  /**
   * Adds a text element to the block. If the text can't take the
   * width of the block, it'll wrap.
   * @param text text to add
   */
  text(text: string) {
    this.elements.push(new TextBlock(text));
  }

  /**
   * Add some vertical space before the next element
   * @param size size of space in pixels
   */
  space(size: number) {
    this.elements.push(new SpaceBlock(size));
  }

  /**
   * Draw a block while controlling the vertical origin so elements are
   * on new lines
   * @param doc PDFKit Document
   * @param origins x and y
   * @param dim width and height
   */
  draw(doc: PDFKit.PDFDocument, origins: Origins, dim: Dimensions) {
    return this.elements.reduce((height, element) => {
      return (
        height +
        element.draw(
          doc,
          {
            x: origins.x,
            y: origins.y + height
          },
          {
            width: dim.width,
            height: dim.height - height
          }
        )
      );
    }, 0);
  }
}

/**
 * This is a graphical element that can be added to a `block`
 */
export interface BlockElement {
  /**
   * Implementations are expected to use PDFKit and return the height of the
   * element they have just drawn
   * @param doc PDFKit Document
   * @param origins x and y
   * @param dim width and height
   */
  draw(doc: PDFKit.PDFDocument, origins: Origins, dim: Dimensions): number;
}

export interface BlockFactory {
  /**
   * Add block elements that will be drawn by the block
   */
  (block: Block): void;
}

/**
 * Text that can be drawn on a block
 */
export class TextBlock implements BlockElement {
  constructor(private text: string) {}

  /**
   * Draw `text` within the confines of `dim` and return the height
   * of the drawn text
   * @param doc PDFKit Document
   * @param origins x and y
   * @param dim width and height
   */
  draw(doc: PDFKit.PDFDocument, origins: Origins, dim: Dimensions) {
    doc.text(this.text, origins.x, origins.y, {
      width: dim.width,
      height: dim.height
    });
    return doc.heightOfString(this.text);
  }
}

/**
 * Simple implementation that doesn't draw anything, only add space to the
 * block
 */
export class SpaceBlock implements BlockElement {
  constructor(private space: number) {}

  /**
   *
   * @param doc PDFKit Document
   * @param origins x and y
   * @param dim width and height
   */
  draw(_doc: PDFKit.PDFDocument, origins: Origins, dim: Dimensions) {
    return this.space;
  }
}
