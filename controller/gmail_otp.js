const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/gmail.hbs"), "utf8")


const gmail_otp=(otp,username,email)=>{
    let transporter = {
        service: 'hotmail',
        auth: {
        user:process.env.user ,
        pass:process.env.pass,
        },
    };
    const smtpTransport = nodemailer.createTransport(transporter)
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({user:username,otp:otp})

        const mailOptions = {
         from:'sheldon.chatbot@hotmail.com',
        to:email,
        subject: `OTP for Change Pin(Sheldon Bank)`,
        html: htmlToSend
            }
            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('hotmail')
                  console.log(err);
                  res.sendStatus(400)
                } else {
                    result.save()
                    res.send('mail sent')
                   
                }
              });
}
