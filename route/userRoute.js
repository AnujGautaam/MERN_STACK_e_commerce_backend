const express = require("express")
const { addingUser, confirmingUser, resendingconfirmation, signingIn, signingOut, forgottenPassword, listingUsers, detailingUser, deletingUser, resettingPassword } = require("../controller/userController")
const router = express.Router()


// for the registeration of the user 
router.post("/registering",addingUser)

// for confirming the user
router.get("/confirminguser/:token",confirmingUser)



//for resending of the confirmation email 
router.post("/resendingconfirmation",resendingconfirmation) 



// for signing in 
router.post("/signingin", signingIn)


// for signing out
router.get("/signingout",signingOut)


// forgotten the password

router.post("/forgottenpassword",forgottenPassword)


// resetting the password of the user 
router.post("/resettingpassword/:token",resettingPassword)

// finding all the users 
router.get("/listingusers",listingUsers)


// detailing the user
router.get("/detailinguser/:id",detailingUser)

// deleting the user 
router.delete("/deletinguser/:id",deletingUser)









module.exports = router
