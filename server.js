const express=require('express')
const app=express()
const cors = require('cors');
const mongoose=require("mongoose")  
// const MongoStore=require("connect-mongo")
const bodyParser = require('body-parser');
require("dotenv").config()
app.use(express.urlencoded({extended:true}));   
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
app.use(cors());
app.use(bodyParser.json());

mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
        console.log("listening chola bank")
    })
  
    console.log("success chola bank")})
    .catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{
    console.log('index in runnning')
    res.render('index')
})

// route to verify  user 
const verify_user=require('./controller/verify_otp') 
app.use(verify_user)
//route  to login 
const login =require('./controller/login')
app.use(login)

//route  get balance 
const get_balance=require('./controller/get_balance')
app.use(get_balance)

//route  to  withdraw
const  withdraw=require('./controller/withdraw')
app.use(withdraw)

//route  to view_transaction
const  view_transaction=require('./controller/view_transaction')

app.use(view_transaction)

//route to  change  pin 
const change_pin=require('./controller/change_pin')
app.use(change_pin)

//route  to money  transfer
const transfer=require('./controller/money _transfer')
app.use(transfer)

//route  to  buys  stocks
const  demat_buy_stock=require('./controller/demat_buy_stock.js')
app.use(demat_buy_stock)
 

//route  to  sell stocks
const demat_sell_stocks=require('./controller/demat_sell_stocks')
app.use(demat_sell_stocks)

//route to bidirectional transfer btw trading and  saving account
const demat_transfer=require('./controller/demat_transfer')
app.use(demat_transfer)

//route to block and unblock cc
const  block=require('./controller/block_card')
app.use(block)

//route to card bill 

const bill=require('./controller/card_bill')
app.use(bill)