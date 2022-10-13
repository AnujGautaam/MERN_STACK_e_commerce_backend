const Category  = require("../model/categoryModel")


exports.addingCategory = async(req,res)=>{
    let category = await Category.findOne({
        category_name:req.body.category_name
    })
    if(category==null){
        let category = new Category({
            category_name : req.body.category_name
        })
        category = await category.save()
        if(!category){
            return res.status(400).json({error:"something went wrong with saving the category"})
        }
        res.send(category)

    }
    else{
        return res.status(400).json({error:"the category his highness has entered already exists"})
    }



// let category = new Category({
//     category_name:req.body.category_name
// })
// category = await category.save()

// if(!category){
//    return res.status(400).json({error:"there is something wrong with saving the category"})

// }
// res.send(category)
/* the 3 types of urls to deal with include
1. form-> this will have req.body
2. url-> this will have req.params, such in the case of facebook and other websites
3.query url-> req.query, such in the case of google 


*/


}
// one issue with leaving the addingcategory function as it is that there might be instances of creation of multiple categories of the same name and this will hamper the database creation process. hence a findOne is introduced so that the database is limited to one category 

// using the same type of coding algorithm, listing of the categories is to be done below
exports.listingCategories = async(req,res)=>{
    let category = await Category.find()

    if(!category){
        return res.status(400).json({error:"something is heavily wrong with finding what you have searched for"})
    }
    res.send(category)
}

// for finding categories with respect to their ids 


exports.findingCategory = async(req,res)=>{
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"couldnt retrive the category through id"})
    }
    res.send(category)
} 


// for updating the category which means changing the values of the category

exports.updatingCategory = async(req,res)=>{
    let category  = await Category.findByIdAndUpdate(req.params.id, {
        category_name:req.body.category_name
    },
    {new:true})

    if(!category){
        return res.status(400).json({error:"couldnt find or/and update the category"})
    }
    res.send(category)
}


// for deleting the category using promise function 

 exports.deletingCategory = (req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
             if(!category){
                return res.status(400).json({error:"the category is not deleted because it hasnt been detected"})

        }
        else{
            return res.status(200).json({m:"the category has been deleted your highness"})
        }

    }
       
        
        
        
        )
    .catch(err=>{
        return res.status(400).json({error_from_catch:err})
    })

 }


// exports.deletingCategory = async(req,res)=>{
//     let category  = await Category.findById(req.params.id)
//     if(category==null){
//         return res.status(400).json({erronous:"the category is not found based on the entered id"})
//     }
//     else{
//         let category = Category.findByIdAndRemove(req.params.id)
//         if(!category){
//             return res.status(400).json({erronous:"the category is not removed for some reason"})   
//         }
//         else{
//             return res.status(200).json({SMS:"the category has been assassinated by Kill Bill gang"})
//         }
//     }
// }