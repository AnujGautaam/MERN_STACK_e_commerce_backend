const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

// this is for the authentication of the user
const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },

    userId:{
        type:ObjectId,
        
        ref:"User",
       
        required:true 

    },
    createdAt:{
        type: Date, 
        expires:86400,
        default: Date.now()


    }

})

module.exports = mongoose.model("Token",tokenSchema)