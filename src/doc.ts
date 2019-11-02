import PDFDocument from 'pdfkit';
import { BlockFactory } from './block';
import { Dimensions, Origins } from './data';
import { CSSMargins, Margins, toEnglish } from './margin';

export class Document {
  readonly doc: PDFKit.PDFDocument;
  readonly margins: Margins;
  private origins: Origins = { x: 0, y: 0 };
  private dim: Dimensions = {
    width: 595,
    height: 842
  };

  /**
   * Create an A4 document
   * @param cssMargin margins for each page of the document
   */
  constructor(cssMargin: CSSMargins) {
    this.margins = toEnglish(cssMargin);
    this.doc = new PDFDocument({
      size: 'A4',
      margins: this.margins
    });
  }

  block(factory: BlockFactory) {
    factory(this.doc, this.origins, this.dim);
  }
}
