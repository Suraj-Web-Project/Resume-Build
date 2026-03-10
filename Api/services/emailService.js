const nodemailer = require("nodemailer");

const sendResumeEmail = async (email, pdfPath, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Resume (Password Protected)",

    text: `
Hello,

Your resume is attached.

Resume Password: ${password}

Use this password to open the PDF.

Regards
Resume Builder
`,

    attachments: [
      {
        filename: "resume.pdf",
        path: pdfPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResumeEmail;
