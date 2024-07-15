const nodemailer = require("nodemailer");
require("dotenv").config();

async function EmailSend(EmailTo, EmailText, EmailSubject) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "nmshakib5@gmail.com",
            pass: "mgqz eteg zali yzcl",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from:`Mern Ecommerce <nmshakib5@gmail.com>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };

    return await transporter.sendMail(mailOptions);
}
module.exports = EmailSend;