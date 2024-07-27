const nodemailer= require('nodemailer');
module.exports.sendMail = async function (str, data) {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
    });
    var sub, content;
    if (str == "signup") {
        sub = "Verify Password";
        content = `<h3>Verify your password by clicking below<br>${data.link}</h3>`;
    }
    else {
        sub = "Reset Password";
        content = `<h3>Reset your password by clicking below<br>${data.link}</h3>`;
    }
    try {
        const info = await transport.sendMail({
            from: process.env.USER,
            to: data.email,
            subject: sub,
            html: content
        });
        console.log("Message Sent with ID:", info.messageId);
    } catch (err) {
        console.log(err.message);
    }
}