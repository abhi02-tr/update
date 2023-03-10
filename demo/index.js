const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const fs = require("fs");

// Your email credentials
const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  service: 'gmail',
  auth: {
    user: "12002080601002@adit.ac.in",
    pass: "Abhi@0211"
  }
});

let text = `<!DOCTYPE html>
                <html lang="en">
               
                            helloo
                   
                        
                </body>
                </html>`;

fs.writeFile('./src/pdf.html', text, (err)=>{ console.error(err); })
// Read the HTML file
fs.readFile("./src/pdf.html", "utf8", (err, html) => {
  if (err) throw err;

  // Generate PDF from HTML
  pdf.create(html, {}).toBuffer((err, buffer) => {
    if (err) throw err;

    // Email options
    const mailOptions = {
      from: "12002080601002@adit.ac.in",
      to: "12002080601002@adit.ac.in",
      subject: "Email with PDF Attachment",
      text: "Please find the attached PDF",
      attachments: [
        {
          filename: "attachment.pdf",
          content: buffer
        }
      ]
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log("Email sent:", info.messageId);
    });
  });
});