const route=require('express').Router()
const user =require('../model/user')

route.post('/block_card',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
        console.log('in block')
        result.is_blocked=1
        result.save()
        const is_blocked={
            is_blocked:1
        }
        res.send(is_blocked)
        
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(400)
     })

})

route.post('/unblock_card',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
        console.log('in unblock')
        result.is_blocked=0
        result.save()
        const is_blocked={
            is_blocked:0
        }
        res.send(is_blocked)
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(400)
     })



})
module.exports=route
