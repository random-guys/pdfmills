import PDFDocument from "pdfkit";
import {
  CSSMargins,
  FontStyle,
  Margins,
  switchFont,
  toEnglish,
  getRGB,
  ColorValue
} from "../utils";
import { pageBounds, fullPageBounds } from "./bounding-box";
import { Drawable } from "./drawable";

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
  private defaultFont: FontStyle;

  /**
   * Create a new context for managing a document
   * @param margins CSS style margins
   * @param config default font configuration
   */
  constructor(params: ContextParams) {
    this.margins = toEnglish(params.margins);
    this.raw = new PDFDocument({ size: "A4", margins: this.margins });

    if (params.backgroundColor) {
      params.backgroundColor.draw(this, fullPageBounds());

      this.raw.on("pageAdded", () => {
        params.backgroundColor.draw(this, fullPageBounds());
      });
    }

    switchFont(this.raw, params.fontStyle);
    this.defaultFont = params.fontStyle;
  }

  addPage() {
    this.raw.addPage({ size: "A4", margins: this.margins });
  }

  onNewPage(fn: () => void) {
    this.raw.on("pageAdded", fn);
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

/**
 * DTO for initializing a Cotent
 */
export interface ContextParams {
  backgroundColor?: Drawable;
  fontStyle: FontStyle;
  margins: CSSMargins;
}
