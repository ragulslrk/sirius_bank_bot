const express=require('express')
const app=express()
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()
app.use(express.urlencoded({extended:true}));   
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    console.log('index in runnning')
    res.render('index')
})
app.listen(80,"0.0.0.0",()=>{
    console.log('listening  bank bots')})