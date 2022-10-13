const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    category_name :{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})
// timstamps will give info on created at and imported at



module.exports = mongoose.model("Category",categorySchema)

// after creating the model, the next step is to write a function for it to work




