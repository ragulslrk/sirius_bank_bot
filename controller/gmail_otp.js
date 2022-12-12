const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/gmail.hbs"), "utf8")


const gmail_otp=(otp,username,email)=>{
    let transporter = {
        service: 'gmail',
        auth: {
        user:process.env.user ,
        pass:process.env.pass,
        },
    };
    const smtpTransport = nodemailer.createTransport(transporter)
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({user:username,otp:otp})

        const mailOptions = {
         from:'siriusbankbot.info@gmail.com',
        to:email,
        subject: `OTP for Login (Sirius Bank)`,
        html: htmlToSend
            }
            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('gmail sent')
                  console.log(err);
                } else {
                    return 
                }
              });
}

module.exports=gmail_otp