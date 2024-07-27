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
    // var sub, content;
    // if (str == "signup") {
    //     sub = "Verify Password";
        
    // }
}
