import { Origins, Dimensions } from './data';

export class Block {
  private elements: BlockElement[] = [];

  draws(pdfKit: PDFKit.PDFDocument, origins: Origins, dim: Dimensions) {
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

export interface BlockElement {
  draw(pdfKit: PDFKit.PDFDocument, origins: Origins, dim: Dimensions): number;
}

export interface BlockFactory {
  (block: Block): void;
}
