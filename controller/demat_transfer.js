const  route=require('express').Router()
const demat_user=require('../model/demat_user')
const user =require('../model/user')

// route to  transfer the saving  to trading 
route.post('/saving_to_trading',(req,res)=>{
    //input username,amount

    user.findOne({username:req.body.username})
    .then(saving=>{
        demat_user.findOne({username:req.body.username})
        .then(trading=>{
            console.log(saving,trading)
            saving.balance=saving.balance-parseInt(req.body.amount)
            trading.balance=trading.trading_balance+parseInt(req.body.amount)
            const balance={
                saving_balance:saving.balance-parseInt(req.body.amount),
                trading_balance:trading.trading_balance+parseInt(req.body.amount)
            }
            console.log(balance);
            saving.save()
            trading.save()
            
            res.send(balance)



        })
        
    })

})

route.post('/trading_to_saving',(req,res)=>{
    //input username,amount

    user.findOne({username:req.body.username})
    .then(saving=>{
        demat_user.findOne({username:req.body.username})
        .then(trading=>{
            console.log(saving,trading)
            trading.balance=trading.trading_balance-parseInt(req.body.amount)
            saving.balance=saving.balance+parseInt(req.body.amount)
            const balance={
                trading_balance:trading.trading_balance-parseInt(req.body.amount)
                ,
                saving_balance:saving.balance+parseInt(req.body.amount)

            }
            trading.save()
            saving.save()
          
            res.send(balance)

        })
        
    })

})

module.exports=route