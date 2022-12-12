const route=require('express').Router()
const user =require('../model/user')
const transaction=require('../model/transaction')
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/transaction.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};
const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)
//retutn the current date
function Today()
{   var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today

}




route.post('/check_user',(req,res)=>{
    console.log(req.body)
    user.findOne({account_number:req.body.account_number,ifsc_code:req.body.ifsc_code},{username:1,account_number:1,ifsc_code:1,branch_name:1})

    .then((result)=>{
        console.log(result)
        
        if(result===null)
        {
            res.sendStatus(400)
        }
        else
        {   
            res.send(result)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})


//route to transfer to another account 
route.post('/transfer_another',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.from_username})
    .then((from_user)=>{
        const debit_amount=parseInt(req.body.amount)
        const final_debit=from_user.balance-debit_amount
        from_user.balance=final_debit
       
        //to user
        user.findOne({username:req.body.to_username})
        .then((to_user)=>{
            console.log(to_user)
            const credit_amount=parseInt(req.body.amount)
            const final_credit=to_user.balance+credit_amount
            to_user.balance=final_credit
            to_user.save()
            from_user.save()

            //transaction statement
            const trans_from=new transaction({
                from:from_user.username,
                to:to_user.username,
                type:"transfer another",
                balance:final_debit,
                date:Today(),
                credit:0,
                debit:debit_amount,
                action:'sended'
            }) 
            trans_from.save()
            const trans_to=new transaction({
                from:from_user.username,
                to:to_user.username,
                type:"transfer another",
                balance:final_credit,
                date:Today(),
                credit:credit_amount,
                debit:0,
                action:"received"
            }) 
            trans_to.save()
            
            const balance={
                balance:final_debit
            }
        //from user  gmail
        const htmlToSend1 = template({user:from_user.username,amount:debit_amount,balance:final_debit,content:'Debit',condition:'from'})
    
            const mailOptions1 = {
             from:'siriusbankbot.info@gmail.com',
            to:from_user.email,
            subject: `Debited Amount (Sirius Bank)`,
            html: htmlToSend1
                }
                smtpTransport.sendMail(mailOptions1, function (err, info) {
                    if (err) {
                      console.log(err);
                    } else {
                        console.log('gmail sent1')
                        // to user  gmail
                            const htmlToSend2 = template({user:to_user.username,amount:credit_amount,balance:final_credit,content:'Credit',condition:'to'})
                            console.log(to_user.email);
                            const mailOptions2 = {
                            from:'siriusbankbot.info@gmail.com',
                            to:to_user.email,
                            subject: `Credited Amount (Sirius Bank)`,
                            html: htmlToSend2
                                }
                                smtpTransport.sendMail(mailOptions2, function (err, info) {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                        console.log('gmail sent2')
                                            res.send(balance)
                                        
                                    }
                                  });
                        
                    }
                  });

            


        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports=route