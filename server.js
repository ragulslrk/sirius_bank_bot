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
    res.render('index')
})
app.listen(process.env.PORT ||3232,()=>{
    console.log("listening sirius bank")})