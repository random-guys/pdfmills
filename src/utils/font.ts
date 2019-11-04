/**
 * Either RGB or a single value x as all RGB values
 */
export type ColorValue = [number, number, number] | number;

/**
 * An object to bring together PDFKit's font settings
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
