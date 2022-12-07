const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const withdraw=new new_schema({
username:{
 
    required:false,
    type:String
},
date:{
    required:false,
    type:Date

},
Withdraw_amount:{
    required:false,
    type:Number

},
balance:{
    required:false,
    type:Number

}
},{versionKey:false})
const withdraw_mod=mongoose.model('withdraws',withdraw)
module.exports=withdraw_mod