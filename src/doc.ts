import PDFDocument from 'pdfkit';
import { Block, BlockFactory } from './block';
import { Dimensions, Origins } from './data';
import { CSSMargins, Margins, toEnglish } from './margin';

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

export class Document {
  readonly doc: PDFKit.PDFDocument;
  readonly margins: Margins;
  private origins: Origins;
  private dim: Dimensions;

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

    this.origins = {
      x: this.margins.left,
      y: this.margins.top
    };

    this.dim = {
      width: A4_WIDTH - (this.margins.left + this.margins.right),
      height: A4_HEIGHT - (this.margins.top + this.margins.bottom)
    };
  }

  /**
   * Use this to draw a set of elements that are arranged vertically, with
   * each one on a `new line`
   * @param factory is the function user's will use to describe the block
   */
  block(factory: BlockFactory) {
    const block = new Block();

    // pretend draw stuff
    factory(block);

    // update doc's trackers
    const height = block.draw(this.doc, this.origins, this.dim);
    this.origins.y += height;
    this.dim.height -= height;
  }
}
