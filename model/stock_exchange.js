const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const stock_exchange=new new_schema({
    username:{
        required:false,
        type:String
    },
    stock_name:{
        required:false,
        type:String 
    },
    current_price:{
        required:false,
        type:Number 
    },
    total_quantity:{
        required:false,
        type:Number,
     },

    buy_quantity:{
        required:false,
        type:Number
        },
    sell_quantity:{
            required:false,
            type:Number,
            default:0
            }
    
    
},{versionKey:false})
const stock_exchanges=mongoose.model('stock_exchanges',stock_exchange)
module.exports=stock_exchanges