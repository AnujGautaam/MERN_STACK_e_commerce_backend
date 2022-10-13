const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const OrderSchema= mongoose.Schema({
    orderItemsIds:[{
        type:ObjectId,
        ref:"OrderItems",
        required:true
    }],

    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    },

    shipping_address:{
        type:String,
        required:true
    },
    alternate_shipping_address:{
        type:String
    },

    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    totalOrderPrice:{
        type:Number,
        required:true
    }


}, {timestamps:true})


module.exports = mongoose.model("Order",OrderSchema)