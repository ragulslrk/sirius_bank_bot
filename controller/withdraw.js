const route =require("express").Router()
const user =require('../model/user')
const withdraw=require('../model/withdraw')
const path = require("path")
const nodemailer=require("nodemailer")
var unirest = require("unirest");

const handlebars = require("handlebars")
const fs = require("fs")

function Today()
{   var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today

}

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/withdraw.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};



const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

route.post('/withdraw',(req,res)=>{
    console.log('in withdraw');
    user.findOne({username:req.body.username})
    .then((result)=>{
        console.log(req.body)
        const Withdraw_amt=parseInt(req.body.amount)
            const final_amt=result.balance-Withdraw_amt
            result.balance=final_amt
           const withdraw_record=new withdraw({
                username:req.body.username,
                Withdraw_amount:Withdraw_amt,
                balance:final_amt,
                date:Today()
            })
            result.save()
            withdraw_record.save()
            const balance={
                balance:final_amt
            }

            const htmlToSend = template({user:result.username,balance:final_amt,withdraw:Withdraw_amt})
        const mailOptions = {
         from:'siriusbankbot.info@gmail.com',
        to:result.email,
        subject: `Withdraw Notification(Sirius Bank)`,
        html: htmlToSend
            }
          
            
          
          smtpTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('err mail')
              console.log(err);
              res.sendStatus(400)
            } else {
              
res.send(balance)

               
            }
          });
         

    })
    .catch((err)=>{
        console.log(err,'error')
    })
})





module.exports=route