const express = require("express")
const { addingCategory, listingCategories, findingCategory, updatingCategory, deletingCategory } = require("../controller/categoryController")

const router = express.Router()


router.post("/addingcategory",addingCategory)
// just using this is not enough for the api to pass on to the values. this is because another plaugin is required called the body-parser that allows for sending in the data from the body of the api 

router.get("/listingcategories",listingCategories)
// for retrieving the data from the api or the database

router.get("/findingcategory/:id", findingCategory)


router.put("/updatingcategory/:id",updatingCategory)
// for updating the category


// for deleting a category
router.delete("/deletingcategory/:id",deletingCategory)

module.exports = router