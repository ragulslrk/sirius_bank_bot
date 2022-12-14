const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const demat_user=new new_schema({
    username:{
        required:false,
        type:String
    },
    trading_balance:{
        required:false,
        type:Number 
    },
    email:{
        required:false,
        type:String 
    }
    
},{versionKey:false})
const demat_users=mongoose.model('demat_users',demat_user)
module.exports=demat_users