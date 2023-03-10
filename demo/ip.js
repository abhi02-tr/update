const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Generate the QR code
QRCode.toFile('./qr-code.png', 'Your data to encode in QR code', function (err) {
  // Create a transporter object using your preferred email service
  let transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: "12002080601002@adit.ac.in",
    pass: "Abhi@0211"
  }
  });

  // Define the email options
  let mailOptions = {
    from: "12002080601002@adit.ac.in",
      to: "12002080601002@adit.ac.in",
      subject: "Email with PDF Attachment",
      text: "Please find the attached PDF",
      html: `<h1>QR Code</h1>`,
    attachments: [{
      filename: 'qr-code.png',
      path: './qr-code.png'
    }]
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    // Delete the QR code file after sending the email
    fs.unlinkSync('./qr-code.png');
  });
});