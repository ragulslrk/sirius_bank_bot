const route=require('express').Router()
const user =require('../model/user')


route.post('/login',(req,res)=>{
    console.log(req.body)
    var pin1=parseInt(req.body.pin)
    user.findOne({username:req.body.username})
    .then((result)=>{
        console.log(result)
        if(result===null)
        {   console.log('in username')
            res.sendStatus(400)
        }
        else{
            if(result.pin === pin1)
                {console.log('api send')
                  res.send(result)
                }
            else{   
                res.sendStatus(400)

                }
        }
                
            })
          
            
            .catch((err)=>{
                console.log(err)
            })
            
        
   
})
module.exports=route  