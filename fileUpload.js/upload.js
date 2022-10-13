const multer = require('multer')
const fs = require("fs")
const path = require('path')



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let fileDestination = 'public/uploads'
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination, {recursive:true})
        }
        cb(null, fileDestination)

    },
    filename:(req,file,cb)=>{
        // abc.jpeg = basename.extension = file.originalname

        // this is for the extraction of the extension of a file 
        let ext = path.extname(file.originalname)
        let filename = path.basename(file.originalname,ext)

        // time for the introduction of the callback function 

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// unique suffix is made using the combination of random digits rounded by after the multiplication with 10^9 followed by a hyphen with the current date

    cb(null, filename + '-' + uniqueSuffix+ext)

    }


})


// this is for filtering the type of image to be used

let imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|JFIF)/)){
            return cb(new Error("the uploaded file has to be an image"),false)
    }
    cb(null,true)
}


// this  is for the separation of the upload file to be uploaded

let upload  =  multer({
    storage:storage,
    fileFilter: imageFilter,
    limits:{
        fileSize:200000
    }
})


module.exports = upload
