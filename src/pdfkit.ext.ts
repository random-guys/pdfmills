/**
 * Either RGB or a single value x as RGB
 */
export type ColorValue = [number, number, number] | number;

/**
 * Width and Height
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * X and Y position
 */
export interface Origins {
  x: number;
  y: number;
}

/**
 * Configuration for a text object
 */
export interface FontConfig {
  font?: string;
  fontSize?: number;
  color?: ColorValue;
}

/**
 * Convert pdfmills `ColorValue` to RGB array
 * @param color pdfmills color
 */
export function getRGB(color: ColorValue): [number, number, number] {
  return Array.isArray(color) ? color : [color, color, color];
}

/**
 * Change font settings of a PDFKit document based on pdfmills's `FontConfig`
 * @param doc PDFKit document
 * @param config pdfmills `FontConfig`
 */
export function switchFont(doc: PDFKit.PDFDocument, config: FontConfig) {
  if (config.font) doc.font(config.font);
  if (config.font) doc.fontSize(config.fontSize);
  if (config.color) doc.fillColor(getRGB(config.color));
}
