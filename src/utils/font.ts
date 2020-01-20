/**
 * Either a single value x as all RGB values or normal PDFKit color values
 */
export type ColorValue = number | PDFKit.Mixins.ColorValue;

/**
 * An object to bring together PDFKit's font settings
 */
export interface FontStyle {
  align?: "center" | "justify" | "left" | "right";
  fontSize?: number;
  fontFamily?: string;
  fontColor?: ColorValue;
}

/**
 * Convert single digit color value to RGB
 * @param color pdfmills color
 */
export function getRGB(color: ColorValue): PDFKit.Mixins.ColorValue {
  return typeof color === "number" ? [color, color, color] : color;
}

/**
 * Change font settings of a PDFKit document based on pdfmills's `FontConfig`
 * @param doc PDFKit document
 * @param config pdfmills `FontConfig`
 */
export function switchFont(doc: PDFKit.PDFDocument, config: FontStyle) {
  if (config.fontFamily) doc.font(config.fontFamily);
  if (config.fontSize) doc.fontSize(config.fontSize);
  if (config.fontColor) doc.fillColor(getRGB(config.fontColor));
}
