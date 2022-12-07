const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const transaction=new new_schema({
from:{
 
    required:false,
    type:String
},
to:{
 
    required:false,
    type:String
},
date:{
    required:false,
    type:Date

},
credit:{
    required:false,
    type:Number

},
debit:{
    required:false,
    type:Number

},
balance:{
    required:false,
    type:Number

},
type:{
    required:false,
    type:String
},
action:{
    required:false,
    type:String
}
},{versionKey:false})
const trans_mod=mongoose.model('transactions',transaction)
module.exports=trans_mod