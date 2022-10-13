const express = require("express")
const { funk } = require("../controller/demo2")
const { funky } = require("../controller/demoController")
const router  = express.Router()


router.get('/router', (req,res)=>{
    res.send("this message was written by chaden")

})

router.get("/router1",funky)
router.get("/secondo",funk)


module.exports = router