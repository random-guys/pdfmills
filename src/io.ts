import { createWriteStream } from 'fs';

/**
 * Save a pdf document.
 * @param pdfKit PDFKit instance
 * @param path path to store the file
 */
export function save(pdfKit: PDFKit.PDFDocument, path: string) {
  pdfKit.pipe(createWriteStream(path));
  pdfKit.end();
}
