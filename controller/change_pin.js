const  route  =require('express').Router()
const msg_otp=require('./msg_otp')
const generateOTP=require('./otp_gen')
const user =require('../model/user')
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/pin_gmail.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};
const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

route.post('/verify_user',(req,res)=>{
    const ac_num=parseInt(req.body.account_number)
        user.findOne({username:req.body.username,account_number:ac_num})
        .then((result)=>{
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})

route.post("/send_otp_pin",(req,res)=>{
    const ac_num=parseInt(req.body.account_number)
    console.log(req.body)
    user.findOne({username:req.body.username,account_number:ac_num})
    .then((result)=>{
        const otp=generateOTP()
        result.otp_change_pin=otp   
       console.log(otp)

       if(req.body.option === "1")
       {
        
       
        const htmlToSend = template({user:result.username,otp:otp})
    
            const mailOptions = {
             from:'siriusbankbot.info@gmail.com',
            to:result.email,
            subject: `OTP for Change Pin(Sirius Bank)`,
            html: htmlToSend
                }
                smtpTransport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                      console.log(err);
                    } else {
                        console.log('gmail sent')
                        result.save()
                          res.send('mail sent')
                    }
                  });
           

       }
       else if(req.body.option === "2"){
          msg_otp(otp,result.phoneno)
          result.save()
          return  res.send('sms sent')

       }
       else{
       res.sendStatus(400) 

       }
          
            
          
    

    })
    .catch(err=>{
        console.log(err)
    })

   
})

route.post('/update_pin',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
        const new_pin =parseInt(req.body.pin)
        if(result.pin === new_pin)
        {
            res.sendStatus(401)
        }
        else{
            result.pin=new_pin
            result.otp_change_pin='not'
            result.save()
            res.sendStatus(200)
        }
    
    
    })
    .catch(err=>{
        console.log(err)
    })
    })
module.exports=route