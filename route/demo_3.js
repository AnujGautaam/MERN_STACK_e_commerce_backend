const express = require("express")
const { bjorn } = require("../controller/demo_3_controller")
const router = express.Router()

router.get("/advantage",(req,res)=>{
    res.send("this is something to be proud of by bjorn strastus")

})


router.get("/ad",bjorn)

module.exports = router