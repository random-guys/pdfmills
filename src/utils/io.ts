import { createWriteStream } from 'fs';
import path from 'path';

/**
 * Save a pdf document.
 * @param doc PDFKit instance
 * @param path path to store the file
 */
export function save(doc: PDFKit.PDFDocument, path: string) {
  doc.pipe(createWriteStream(path));
  doc.end();
}

export function resolver(assetDir: string) {
  return (file: string) => path.join(path.resolve('./dist', assetDir), file);
}
