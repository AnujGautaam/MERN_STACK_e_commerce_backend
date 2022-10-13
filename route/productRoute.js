const express = require("express")
const { addingProduct, listingProducts, findingProduct, productsByNekoegory, updatingProduct, deletingProduct } = require("../controller/productController")
const upload = require("../fileUpload.js/upload")

const router = express.Router()


// for the adding of the product
// upload.single('product_image') is executed after the introduction of the multer package and the creation of the upload.js function 
router.post("/addingproduct",upload.single('product_image'), addingProduct)

// to find all the katanas from the database 
router.get("/listingproducts",listingProducts)


// for finding katana product in the database based on their ids 
router.get("/findingproduct/:id",findingProduct) 


// for finding katana based on the category it belongs to 
router.get("/findingproductbycategory/:id",productsByNekoegory)


// for updating the products 
router.put("/updatingproduct/:id",updatingProduct)


// for deleting the product based on the id
router.delete("/deletingproduct/:id",deletingProduct)
module.exports = router