const mongoose = require("mongoose")
const uuidv1 = require("uuidv1")
const crypto = require("crypto")


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String, 

    },
    role:{
        type:Number,// 0 is for normal user while 1 is for the admin 
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    salt:String
    // for the generation or the encryption of the password while using hashed_password

},{timestamps:true})


// virtual field

// furthermore, the encryption of the password is done here in the virtual field and saved as a hashed passowrd in the database

/* nameofschema.virtual("name of the field to be encrypted")
.set() for setting up of the password
.get() for retrieving of the password*/

userSchema.virtual("password")
.set(
    function(password){
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    }
)
.get(
    function(){
        return this._password
    }
)



// for the methods dealing with encryption 
userSchema.methods = {
    encryptPassword:function(password){
        if(password==null){return ""}
        try {
            return crypto.Hmac("sha1",this.salt)
            .update(password)
            .digest("hex")
        } catch (error) {
            return ""
            
        }
    },

    authenticated:function(password){
        return this.hashed_password === this.encryptPassword(password)
    }
}

module.exports = mongoose.model("User",userSchema)