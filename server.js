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



