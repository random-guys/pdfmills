import { createWriteStream } from 'fs';

export function save(pdfKit: PDFKit.PDFDocument, path: string) {
  pdfKit.pipe(createWriteStream(path));
  pdfKit.end();
}
