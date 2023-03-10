import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  // secure:true,
  auth: {
    user: "12002080601002@adit.ac.in",
    pass: process.env.EMAIL_PASSWORD,
  }
});


export function sendOtp(data) {
  var mailOptions = {
    from: "12002080601002@adit.ac.in",
    to: data.to,
    subject: data.subject,
    html: data.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}