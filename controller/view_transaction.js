const route=require('express').Router()
const withdraw =require('../model/withdraw')
const transaction=require('../model/transaction')
const path = require("path")
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")


const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/withdraw_statement.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};



const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

route.post('/withdraw_trans',(req,res)=>{
console.log(req.body);
    withdraw.find({username:req.body.username}).sort({"date":-1}).limit(5).lean()
    .then((result)=>{
        console.log(result.length)
            const htmlToSend = template({user:req.body.username,data:result})
            const mailOptions = {
            from:'siriusbankbot.info@gmail.com',
            to:req.body.email,
            subject: `Bank Statement Notification(Sirius Bank)`,
            html: htmlToSend
                }
            
            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('err mail')
                console.log(err);
                res.sendStatus(400)
                } else {
                console.log('mail sent')
                    res.send(result)

                
                }
            });

    })
})



//route  to deposit trans
const emailTemplateSource1 = fs.readFileSync(path.join(__dirname, "/deposit_transaction.hbs"), "utf8")
const smtpTransport1 = nodemailer.createTransport(transporter)
const template1 = handlebars.compile(emailTemplateSource1)

route.post('/deposit_trans',(req,res)=>{
    transaction.find({$or:[
        {$and:[{"from":req.body.username},{"action":"sended"}]},
        {$and:[{"to":req.body.username},{"action":"received"}]},
        {$and:[{"from":req.body.username},{"to":req.body.username},{"type":"self_transfer"}]}
        ]}).sort({"date":-1}).limit(5).lean()
    
    .then((result)=>{
        const htmlToSend = template1({user:req.body.username,data:result})
        const mailOptions = {
        from:'siriusbankbot.info@gmail.com',
        to:req.body.email,
        subject: `Bank Statement Notification(Sirius Bank)`,
        html: htmlToSend
            }
        
        smtpTransport1.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('err mail')
            console.log(err);
            res.sendStatus(400)
            } else {
            console.log('mail sent')
                res.send(result)

            
            }

        });

    })
    .catch((err)=>{
        console.log(err)
    })

})
module.exports=route