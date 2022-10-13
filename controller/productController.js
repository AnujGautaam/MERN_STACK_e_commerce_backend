const Product = require("../model/productModel")

// for adding products
exports.addingProduct = async(req,res)=>{
let product = new Product({

product_name:req.body.product_name,
product_description:req.body.product_description,
product_image:req.file.path,
product_price:req.body.product_price,
count_in_stock:req.body.count_in_stock,
category:req.body.category

})
product = await product.save()
if(!product){
    return res.status(400).json({error:"the product couldnt be created NEO"})
}
res.send(product)


}


// Masamune sencho wants to view the katana products that he has forged 

exports.listingProducts = async(req,res)=>{
    let katana_ikazuki = await Product.find().populate("category","category_name")

    //using populate and category, category_name will show the id and the category of the product  

    // let katana_ikazuki = await Product.find().populate("category")
    // populate is used for category and this provides information on when it was created
    // let katana_ikazuki = await Product.find()


    if(!katana_ikazuki){
        return res.status(400).json({masamune:"I am the forger of the sword and i am not happy as the swords are lost"})
    }
    res.send(katana_ikazuki)
}


// to view individual katana product details 


exports.findingProduct = async(req,res)=>{
    let kenpachi = await Product.findById(req.params.id).populate("category","category_name")
    if(!kenpachi){
        return res.status(400).json({yamamoto:"kenpachi cannot be found for some reason"})
    }
    res.send(kenpachi)
}


// for finding katana products based on the category or Nekoegory id

exports.productsByNekoegory = async(req,res)=>{
    let ichigo = await Product.find({
        category:req.params.id
    })
    if(!ichigo){
        return res.status(400).json({byakuya:"the type of katana product by category is not determined"})
    }
    res.send(ichigo)
}


// for updating products
exports.updatingProduct = async(req,res)=>{
let product = await Product.findByIdAndUpdate(req.params.id,{
product_name:req.body.product_name,
product_description:req.body.product_description,
product_image:req.body.product_image,
product_price:req.body.product_price,
count_in_stock:req.body.count_in_stock,
category:req.body.category

    },{new:true})
    .populate("category","category_name")

if(!product){
    return res.status(400).json({matrix:"there seems to be some error while updating the products"})
}
res.send(product)
}


// for deleting a product

exports.deletingProduct = (req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then(product=>{
        if(!product){
            return res.status(400).json({amar:"the product seems to be hidding somewhere as it is either not located or not deleted"})
        }
        else{
            return res.status(200).json({zoldyck:"the product has been assasinated as per your request"})

        }
    })
    .catch(e=>{return res.status(400).json({undertaker:e})})
    // some sorts of mistakes in entering id will result in this error and is caught
}

// exports.deletingProduct = async(req,res)=>{
//     let product = await Product.findById(req.params.id)
//     if(product==null){
//         return res.status(400).json({messenger:"there doesnt seem to be anyone of the hex name that you have requested sir sherlock"})
//     }
//     else{
//         let product = await Product.findByIdAndRemove(req.params.id)
       
//         if(!product){
//             return res.status(400).json({matrix:"the product has not been deleted sir"})
//         }
//         else{
//             return res.status(200).json({queen:"the product has been deleted under my leadership"})
//         }
//     }
// }

// the advantage of using promise instead of async await in this case is that it will catch the error in case the url id or something else has been mistyped