const  route  =require('express').Router()
const  stock_exchange=require('../model/stock_exchange')
const demat_user=require('../model/demat_user')
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/stock_buy.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    }
};
const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

// route to buy  stocks  
route.post('/demat_buy_stock',(req,res)=>{
    // input  username,no.of stocks, stockname,currentprice
demat_user.findOne({username:req.body.username})
 .then(result=>{

    //deducing the amount in  trading  account 
    const  total_amt=parseInt(req.body.buy_quantity)*parseInt(req.body.current_price)
    result.trading_balance=result.trading_balance-total_amt
    console.log(total_amt)

    stock_exchange.findOne({username:req.body.username,stock_name:req.body.stock_name})
    .then(result1=>{
        if(result1===null)
        {
           create_stock=new  stock_exchange({username:req.body.username,
                                      stock_name:req.body.stock_name,
                                      current_price:parseInt(req.body.current_price),
                                      total_quantity:parseInt(req.body.buy_quantity),
                                      buy_quantity:parseInt(req.body.buy_quantity)})

                                      create_stock.save()
                                      result.save()
                                      

        }   
        else{
            result1.current_price=parseInt(req.body.current_price)
            result1.total_quantity=result1.total_quantity+parseInt(req.body.buy_quantity)
            result1.buy_quantity=result1.buy_quantity+parseInt(req.body.buy_quantity)

            result1.save()
            result.save()


            
        }
        const htmlToSend1 = template({stockname:req.body.stock_name,user:req.body.username,current_price:req.body.current_price,total:req.body.buy_quantity,total_amt:total_amt})
    
        const mailOptions1 = {
         from:'siriusbankbot.info@gmail.com',
        to:result.email,
        subject: `Debited Amount (Sirius Bank)`,
        html: htmlToSend1
            }
            smtpTransport.sendMail(mailOptions1, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                    console.log('gmail sent ');
                res.send('success')}
                })

         
    })
    .catch(err=>{
        console.log(err);
    })

 })
.catch(err=>{
        console.log(err);
    })

})


// route  to  check  balance  
route.post('/check_trading_balance',(req,res)=>{
    //input ->username
    demat_user.findOne({username:req.body.username},{_id:0,trading_balance:1})
    .then(result=>{
    console.log(result);
    
res.send(result)
    })
})

module.exports=route
