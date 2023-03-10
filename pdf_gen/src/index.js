var PDFDocument = require('pdfkit');
var doc = new PDFDocument;

doc.pipe(fs.createWriteStream('output.pdf'));

doc.text('Hello World!', 100, 100);

doc.end();


