const User = require("../model/userModel")
const Token = require("../model/tokenModel")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

// 3.2 instantiation of the middleware function for sending email 
const sendingEmail = require("../middleware/sendEmail")



exports.addingUser = async(req,res)=>{
    // to ensure that email exists and is unique for registration 
    
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"email already exists. Please log in or try another email address."})
    }
    else{
        // if email doesnt exist, create toekn, send token in email and register
        let new_user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }) 
        new_user = await new_user.save()
        if(!new_user){
            return res.status(400).json({error:"something went wrong"})
        }
    
        else{
            let token = new Token({
                token: crypto.randomBytes(16).toString("hex"),
                // jwt.sign(new_user,process.env.JWT_SECRET,{algorithm:"RS256"}),
                userId:new_user._id
    
            })
            token = await token.save()
    if(!token){
        return res.status(400).json({error:"something went wrong"})
        
    }
    // const url = `http://localhost:5000/api/confirminguser/${token.token}`
    // const url = `${process.env.FRONTEND_URL}/confirmuser/${token.token}`
    
    const url = `http://localhost:3000/confirminguser/${token.token}`
// this is for the connection to the front end


    // there was error of having too long of a message for the web browser to decrypt and it was caused because i had used https instead of http. so this is one note to remember. the error has been mentioned below
    /*An error occurred during a connection to localhost:5000. SSL received a record that exceeded the maximum permissible length.
    
    Error code: SSL_ERROR_RX_RECORD_TOO_LONG */
    
    
    // sending mail
    
    sendingEmail({
        from:"noreply@admin.com",
        to:new_user.email,
        subject:"Email verification",
        text:`please click on the link below or copy and paste the following link for the verification of your account.${url}`,
        html:`<a href=${url}><button>Verify Email</button></a>`
    
    })
    res.send(new_user)
    
      
        }
    
    }
}




/* adding user will be contained within this
exports.addingUser = async (req, res) => {
    //one thing to note is that multiple emails should not be allowed to create an account hence a check is coducted
    // for this a findOne check is to be done 


    if (!user) {
        // this means that the entered email hasnt been registered yet

        // for the proper registration, create a token, send  the token via email and register the user

        // 1. first take the email and password details for the new user



        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        user = await user.save()
        if (!user) {
            return res.status(400).json({ matrix: "the user could not be saved" })
        }

        else {
            // 2. the user is already saved meaning an email is taken from the user. the next task is to create a token and send it via email to the user for registeration 

            let token = new Token({
                token: crypto.randomBytes(16).toString("hex"),
                userId: user._id

            })

            token = await token.save()
            if (!token) {
                return res.status(400).json({ auzz: "sorry mate the token couldnt be saved at the moment" })
            }

            const url = `http:localhost:5000/api/confirminguser/${token.token}`

            //   3. in the third step after the successful creation of the token, it is sent via email that the user entered previously 

            //3.1  calling the middleware email function 

            sendingEmail({
                from: `noreply@addme.com`,
                to: user.email,
                subject: `verification of the email`,
                text: `click on the url or copy paste the url for verification...${url}`,
                html: `<a href=${url}><button>verification button</button></a>`
            })


            res.send(user)
        }



    }
    else {
        res.status(400).json({ ajinamoto: "the email already exists. Either login with this email or sign up with a different one" })
    }




   
}














adding user will be contained within this
*/



    // this is the second one that i wrote
    
    
    
    
    
    



    // this is the first one written by me


    /*
    
    if (!user) {
        // this means that the entered email hasnt been registered yet

        // for the proper registration, create a token, send  the token via email and register the user

        // 1. first take the email and password details for the new user



        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        user = await user.save()
        if (!user) {
            return res.status(400).json({ matrix: "the user could not be saved" })
        }

        else {
            // 2. the user is already saved meaning an email is taken from the user. the next task is to create a token and send it via email to the user for registeration 

            let token = new Token({
                token: crypto.randomBytes(16).toString("hex"),
                userId: user._id

            })

            token = await token.save()
            if (!token) {
                return res.status(400).json({ auzz: "sorry mate the token couldnt be saved at the moment" })
            }

            const url = `http:localhost:5000/api/confirminguser/${token.token}`

            //   3. in the third step after the successful creation of the token, it is sent via email that the user entered previously 

            //3.1  calling the middleware email function 

            sendingEmail({
                from: `noreply@addme.com`,
                to: user.email,
                subject: `verification of the email`,
                text: `click on the url or copy paste the url for verification...${url}`,
                html: `<a href=${url}><button>verification button</button></a>`
            })


            res.send(user)
        }



    }
    else {
        res.status(400).json({ ajinamoto: "the email already exists. Either login with this email or sign up with a different one" })
    }
    
    
    
    */



    




/*

let token = new Token({
    token:req.body.token,
    userId: req.body.userId

})

token = await token.save()
if(!token){
    return res.status(400).json({auzz:"sorry mate the token couldnt be saved at the moment"})
}

else{
//    this is for when the token fails to save
}










*/


// this is for the confirmation of the user after receiving the email 

// this is for the second test




/*

exports.confirmingUser = async (req, res) => {
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ token_msg: "the sent token either expired or it is invalid" })
    }
    else {
        let user = await User.findOne({ _id: token.userId })
        if (!user) {
            return res.status(400).json({ user_msg: "the user cannot be verified with the email provided" })
        }
        else {
            if (user.isVerified) {
                return res.status(400).json({ verified_msg: "the user seems to have already been verified. login to continue" })
            }

            else {
                user.isverified = true
                user = await user.save()
                if (!user) {
                    return res.status(400).json({ aginamoto: "user could not be saved for the verification" })
                }
                
                    return res.status(200).json({ verification_msg: "the user has been verified successfully. congratulations!!!!" })
                

            }
        }
    }
}








*/


//original confirming user is above this 

exports.confirmingUser = async(req,res)=>{
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:"invalid token or the token may have expired"})
    }
    else{
        let user = await User.findOne({_id:token.userId})
        if(!user){
            return res.status(400).json({error:"user associated with the token doesn't exist"})
        }
        else{
            if(user.isVerified){
                return res.status(400).json({error:"user already verified. login to continue"})
            }
            else{
                user.isVerified = true 
                user = await user.save()
                if(!user){
                    return res.status(400).json({error:"something went wrong"})
                }
                return res.status(200).json({message:"user verified successfully"})
                // 200??
            }
        }
    }

}





exports.resendingconfirmation = async(req,res)=>{
    // first check whether it is the same email or not
    // 1. email has to match
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({user_error:"the email has not been registered"})
    }

    // 2. password has to match
    if(!user.authenticated(req.body.password)){
        return res.status(400).json({user_error:"the entered email and password do not match"})
    }
// 3. user need not be verified if a resending of confirmation is to take place
    if(user.isVerified){
        return res.status(400).json({user_error3:"the user has already been verified. log in to continue"})
    }

    // 4. this is the case for not verified user who has registered already
    let token = new Token({
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id

    })

    token = await token.save()
    if (!token) {
        return res.status(400).json({ auzz: "sorry mate the token couldnt be saved at the moment" })
    }

    const url = `http:localhost:5000/api/confirminguser/${token.token}`

   

    sendingEmail({
        from: `noreply@addme.com`,
        to: user.email,
        subject: `verification of the email`,
        text: `click on the url or copy paste the url for verification...${url}`,
        html: `<a href=${url}><button>verification button</button></a>`
    })

    return res.status(200).json({happy:"you have been sent a link for resetting the password"})


}


// for signing in

exports.signingIn =  async(req,res)=>{
    //  checking if the used email and password have been verified and authenticated or not 

    // destructuring 
    const {email,password} = req.body
    // 1. check the email 
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({error:"the email has not be registered yet. login to do so"})
    }

    // 2. autheticate the password
    if(!user.authenticated(password)){
        return res.status(400).json({error:"the password doesnt match"})
    }

    // 3. check if the user is not verified
    if(!user.isVerified){
        return res.status(400).json({error:"the email and the password do not match"})

    }


    // 4. signin using tokens

    let tokens = jwt.sign({_id:user._id, user:user.role},"SECRET_KEY")

    // 5. storing the information in cookies
    res.cookie("myCookies", tokens, {expire:Date.now()+86400})


    // 6. return the information collected from the user

    const {name, _id, role} = user
    return res.status(200).json({tokens, user_info:{name, _id, role, email} })

}


// clearing the cookie for existing out or signing out

exports.signingOut = (req,res)=>{
    res.clearCookie("myCookies")
    res.status(200).json({after_deleting_cookie:"You have successfully signedout"})
}


// for forgotten password

exports.forgottenPassword = async(req,res)=>{
    // 1. check if the user email exists or not

    let user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(400).json({error_email:"the typed email doesnt exist. please register it first"})
    }
    // 2. the email exists, so create a token and send it to the typed email

    let token = new Token({
        token:crypto.randomBytes(16).toString("hex"),
        userId:user._id
    })
    token = await token.save()
    if(!token){
        res.status(400).json({aginamotoz:"the token could not be created for some unknown reason"})
    }
    const url = `http//localhost:5000/api/resettingpassword/${token.token}`

    sendingEmail({

        from: `noreply@addme.com`,
        to: user.email,
        subject: `reset the password`,
        text: `click on the url or copy paste the url for resetting the password...${url}`,
        html: `<a href=${url}><button>reset password</button></a>`

    })

    return res.status(200).json({successful:"the password resetting link has been sent to your email address"})
}


// for resetting the password
exports.resettingPassword = async(req,res)=>{
    let token = await Token.findOne({token:req.params.token})
    if(!token){
       return res.status(400).json({msg_token:"there seems to be some error in finding the token which means it has either expired or is invalid"})

    }

    let user = await User.findById(token.userId)
    if(!user){
        return res.status(400).json({msg:"the user cannot be found with the entered id"})
    }
    user.password = req.body.password
    user = await user.save()

    if(!user){
        return res.status(400).json({erronous:"the user could not be saved"})
    }
    return res.status(200).json({msg:"the password was resetted successfully"})


}


// finding the users 
exports.listingUsers = async(req,res)=>{
    let user = await User.find().select("-hashed_password").select("-salt")
    // note that for not displaying the hashed password and salt used for encryption, they can be ommitted by select method using minus symbol

    // .select("hashed_password") will only display the hashed password while -hashed_password will ommit it
    if(!user){
        res.stauts(400).json({user_not_found_error:"the user wasnt found at all"})
    }
    res.send(user)
}

// finding the details of the user
exports.detailingUser = async(req,res)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        res.status(400).json({erronous:"the user with the id wasnt found"})
    }
    res.send(user)
    
}




// for deleting the user
exports.deletingUser = async(req,res)=>{
    let user = await User.findByIdAndRemove(req.params.id)

    if(!user){
        res.status(400).json({msg:"failed to deleted the user"})
    }
    return res.status(200).json({msg:"user deleted successfully"})
}