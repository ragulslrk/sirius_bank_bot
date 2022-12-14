const route=require('express').Router()
const user =require('../model/user')

route.post('/cc_bill',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
        const pay_amt=parseInt(req.body.amount)
        const final_amt=result.due_amount-pay_amt
        result.due_amount=final_amt
        result.save()
        const due_amount={
            due_amount:final_amt
        }
        res.send(due_amount)
        
    })
    .catch((err)=>{
        console.log(err)
    })

}
)


module.exports=route