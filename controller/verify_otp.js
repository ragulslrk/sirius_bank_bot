const route =require("express").Router()
const user =require('../model/user')
const generateOTP=require('./otp_gen')
const  gmail_otp=require('./gmail_otp')
const msg_otp=require('./msg_otp')

//api  for  send  otp
 route.post('/send_otp',(req,res)=>{
    console.log(req.body.username)
    user.findOne({username:req.body.username})
    .then(result=>{
        otp=generateOTP()
        console.log(otp);
        result.otp_change_pin=otp
        if(req.body.option === "1")
        {
            gmail_otp(otp,result.username,result.email)
            result.save()
           return  res.send('mail sent')

        }
        else if(req.body.option === "2"){
           msg_otp(otp,result.phoneno)
           result.save()
           return  res.send('sms sent')

        }

        res.sendStatus(400)

    })
    .catch((err)=>{
        console.log(err)
    })

 })

 //verify otp
 route.post('/check_otp',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.username})
    .then((result)=>{
        console.log(result)
            if(result.otp_change_pin === req.body.otp)
            {   result.otp_change_pin='not'
                result.save()
                    res.sendStatus(200)            
            }
            else{
                console.log('in otp')
                res.sendStatus(400)
            }
    })
    .catch(err=>{
        console.log(err)
    })
})
 

module.exports =route 
