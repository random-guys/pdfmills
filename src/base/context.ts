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
import { pageBounds } from "./bounding-box";

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
  private backgoundColor: ColorValue;

  /**
   * Create a new context for managing a document
   * @param margins CSS style margins
   * @param config default font configuration
   */
  constructor(params: ContextParams) {
    this.margins = toEnglish(params.margins);
    this.raw = new PDFDocument({ size: "A4", margins: this.margins });

    // set the background color of the page
    this.backgoundColor = params.backgroundColor || "white";
    this.setBackground(this.backgoundColor);

    switchFont(this.raw, params.fontStyle);
    this.defaultFont = params.fontStyle;
  }

  // use this to set a watermark or a background color of the page
  setBackground(color: ColorValue) {
    const box = pageBounds(this.margins);
    this.raw.rect(box.x, box.y, box.width, box.height).fill(getRGB(color));
  }

  addPage() {
    this.raw.addPage({ size: "A4", margins: this.margins });
    this.setBackground(this.backgoundColor);
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
  backgroundColor: ColorValue;
  fontStyle: FontStyle;
  margins: CSSMargins;
}
