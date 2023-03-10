

const QRCode = require('qrcode')
const qrCodeFilePath = '/Spectrum23/pdf_gen/pdf_gen/image.png';//path form D:/Spectrum23/QR-Code/QRCode/image.png

// Creating the data
let data = {
    name:"Employee Name",
    age:27,
    department:"Police",
    id:"aisuoiqu3234738jdhf100223"
}
 
// Converting the data into String format
let stringdata = JSON.stringify(data)
 
// Print the QR code to terminal
QRCode.toString(stringdata,{type:'terminal'},
                    function (err, QRcode) {
 
    if(err) return console.log("error occurred")
 
    // Printing the generated code
    console.log(QRcode)
})
   
// Converting the data into base64
QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")
 
    // Printing the code
    // console.log(code)
})

QRCode.toFile(qrCodeFilePath, 'url', (err) => {
    if (err) throw err;
    console.log('QR code saved to file!');
  });

  const PDFDocument  =  require('pdfkit');
  const fs=require('fs');

  var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('out.pdf')); 
  // Saving the pdf file in root directory.
  // doc.pipe(fs.createWriteStream('example.pdf'));
    
  // Adding functionality
  doc
     
    .fontSize(27)
    .text('This the article for GeeksforGeeks', 100, 100);
    
  // Adding an image in the pdf.
    
    doc.image('image.png', {
      fit: [300, 300],
      align: 'center',
      valign: 'center'
    });
    
    doc
    .addPage()
    .fontSize(15)
    .text('Generating PDF with the help of pdfkit', 100, 100);
     
    
     
  // Apply some transforms and render an SVG path with the 
  // 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();
     
  // Add some text with annotations
  doc
    .addPage()
    .fillColor('blue')
    .text('The link for GeeksforGeeks website', 100, 100)
      
    .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');
     
  // Finalize PDF file
  doc.end();