import { Origins, Dimensions } from './data';

export class Block {
  private elements: BlockElement[] = [];

  text(text: string) {
    this.elements.push(new TextBlock(text));
  }

  draw(pdfKit: PDFKit.PDFDocument, origins: Origins, dim: Dimensions) {
    return this.elements.reduce((height, element) => {
      return (
        height +
        element.draw(
          pdfKit,
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
   * @param pdfKit PDFKit Document
   * @param origins x and y
   * @param dim width and height
   */
  draw(pdfKit: PDFKit.PDFDocument, origins: Origins, dim: Dimensions): number;
}

export interface BlockFactory {
  /**
   * Add block elements that will be drawn by the block
   */
  (block: Block): void;
}

export class TextBlock implements BlockElement {
  constructor(private text: string) {}

  /**
   * Draw `text` within the confines of `dim` and return the height
   * of the drawn text
   * @param pdfKit PDFKit Document
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
