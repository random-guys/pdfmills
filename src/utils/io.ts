import { createWriteStream } from 'fs';
/**
 * Save a pdf document.
 * @param doc PDFKit instance
 * @param path path to store the file
 */
export function save(doc: PDFKit.PDFDocument, path: string) {
  doc.pipe(createWriteStream(path));
  doc.end();
}
