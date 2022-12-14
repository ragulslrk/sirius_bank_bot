const  route  =require('express').Router()
const  stock_exchange=require('../model/stock_exchange')
const demat_user=require('../model/demat_user')
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/stock_sell.hbs"), "utf8")

let transporter = {
    service: 'gmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    }
};
const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)



// route  list of stocks 
route.post('/stock_list',(req,res)=>{
//input username
stock_exchange.find({username:req.body.username},{_id:0,stock_name:1,current_price:1,buy_quantity:1})
.then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{
        console.log(err);
    })
})

// route  to buy  stocks
route.post("/demat_sell_stock",(req,res)=>{

    // input  username,sell_quantity, stock_name,sell_price

    demat_user.findOne({username:req.body.username})
    .then(result=>{
   
       //adding the amount in  trading  account 
       const  total_amt_sell=parseInt(req.body.sell_quantity)*parseInt(req.body.sell_price)
       result.trading_balance=result.trading_balance+total_amt_sell
       console.log(total_amt_sell)

       // changing the value of sellin g quantity
       stock_exchange.findOne({username:req.body.username,stock_name:req.body.stock_name})
       .then(result1=>{
        console.log(result1);
          result1.buy_quantity=result1.buy_quantity-parseInt(req.body.sell_quantity)
          result1.sell_quantity=result1.sell_quantity+parseInt(req.body.sell_quantity)

          const difference= {
            difference:total_amt_sell-(req.body.sell_quantity*result1.current_price)
                }
                const htmlToSend1 = template({stockname:result1.stock_name,user:req.body.username,buy_price:result1.current_price,sell_price:req.body.sell_price,
                    sell_quantity:req.body.sell_quantity,profit:difference.difference})
    
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
                            result1.save()
                            result.save()
                            
                            res.send(difference)

                        }
                        })
            



       })
    })
    .catch(err=>{
        console.log(err);
    })

})

module.exports=route  