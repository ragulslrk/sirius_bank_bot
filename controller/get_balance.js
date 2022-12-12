const route =require('express').Router()
const user =require('../model/user')

route.post('/get_balance',(req,res)=>{
    user.findOne({username:req.body.username},{balance:1,_id:0})
    .then((result)=>{
        res.send(result)
    })
    .catch((err=>{
        console.log(err)
    }))
})
module.exports=route