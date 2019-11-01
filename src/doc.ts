import PDFDocument from 'pdfkit';
import { CSSMargins, Margins, toEnglish } from './margin';

export class Document {
  readonly doc: PDFKit.PDFDocument;
  readonly margins: Margins;

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
}
