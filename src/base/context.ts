import PDFDocument from "pdfkit";
import {
  CSSMargins,
  FontStyle,
  Margins,
  switchFont,
  toEnglish
} from "../utils";
import { BoundingBox, pageBounds } from "./bounding-box";

/**
 * This is a state manager for a PDFKit document. It helps us track the PDFKit
 * document's state
 */
export class Context {
  /**
   * PDFKit document it's managing
   */
  readonly raw: PDFKit.PDFDocument;
  /**
   * Established margins for the document
   */
  readonly margins: Margins;

  private box: BoundingBox;
  private defaultFont: FontStyle;

  /**
   * Create a new context for managing a document
   * @param margins CSS style margins
   * @param config default font configuration
   */
  constructor(margins: CSSMargins, config: FontStyle) {
    this.margins = toEnglish(margins);
    this.raw = new PDFDocument({
      size: "A4",
      margins: this.margins
    });

    this.box = pageBounds(this.margins);

    switchFont(this.raw, config);
    this.defaultFont = config;
  }

  /**
   * Returns the bounding box of the document where no `Element` has
   * been `drawn`
   */
  bounds() {
    return { ...this.box };
  }

  /**
   * `pageBounds` is the equivalent of `pageBounds` from `bounding-box.ts`, taking
   * into account the document margins
   */
  pageBounds() {
    return pageBounds(this.margins);
  }

  addPage() {
    this.raw.addPage({ size: "A4", margins: this.margins });
  }

  /**
   * Move the bounding box by the left and top bar.
   * @param deltaX movement of the left bound
   * @param deltaY movement of the right bound
   */
  reframe(deltaX: number, deltaY: number) {
    this.box.x += deltaX;
    this.box.width -= deltaX;

    this.box.y += deltaY;
    this.box.height -= deltaY;
  }

  /**
   * Run the action using `config` font settings and reset once done. If the config
   * doesn't exist just return the action's result.
   * @param config pdfmills `FontConfig`
   * @param action action to use `config`
   */
  withFont<T>(config: FontStyle, action: () => T): T {
    if (!config) {
      switchFont(this.raw, this.defaultFont);
      return action();
    }
    switchFont(this.raw, { ...this.defaultFont, ...config });
    const result = action();
    switchFont(this.raw, this.defaultFont);

    return result;
  }
}
