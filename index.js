// first is creating an app for express 
// 1
// const { response } = require("express")
// the job of this one is to produce some errors only and we dont need to export response or request at all
const express = require("express")


// 2
// importing .env
require("dotenv").config()
//2.1 importing the port from .env
const port = process.env.PORT 


// 1.1
const app = express()


// middlewares
// 7 
const bodyParser = require("body-parser")

// 10 
const cors = require("cors")
// 10.1 
app.use(cors(
    {
    origin:"http://localhost:3000",
    
    Header:("Access-Control-Allow-Origin", "*")
    // methods:["GET","POST"] this didnot seem to work

    

}
))

// 11. morgan declaration and use
const morgan = require("morgan")




// routes

// 7.1 using the middleware
app.use(bodyParser.json())



// 11.1
app.use(morgan("dev"))

// 5. importing the demoRouter 
const demoRouter = require("./route/demoRouter")

const db = require("./Database/connection")

// 6. importing the category schema route
const Category = require("./route/categoryRoute") // so just using it without the middleware of body parsing produced the result of the server not being able to read the data inside the body hence a milldeware called body-parser is installed

// 8. importing of the product route

const Product = require("./route/productRoute")

// 9. importing of the user route
const User = require("./route/userRoute")





// 5.1 for the use of the imported demoROuter 
app.use("/api",demoRouter)

// 6.1 using the category route
app.use("/api",Category)

// 8.1 use of product route
app.use("/api",Product)

// 9.1 use of  the user route
app.use("/api",User)


// 12 for the selection of the image
app.use("public/uploads",express.static("public/uploads"))



// 4. method or syntax for writing a message into the server
/*app.method(url,function)
suppose,
app.get("/",(request,response)={
    content of the function 
})
here, request = request for getting the data from the server
response = response for posting something into the server


*/

// 4.1 using the syntax and the url 
app.get("/",(request,response)=>{
    response.send("this message has been broadcasted on behalf of lord Zoro")
})

// 4.2 using another url for the boradcast
app.get("/first",(req,res)=>{
    res.send("this is another message from zoro to ask for directions")

})

// this highlighted an issue where running the server continuosly wasnt possible and the server had to be closed opened and the url had to be changed for broadcasting the second message

//4.3 conclusion after the installation of nodemon 
app.get("/nodemondo",(req,res)=>{
    res.send("this message is the final message from zoro the victorious one against the kind from kaido's crew")

}) 
// 4.3 conclusion this solves the issue of restarting the server time and again



// 3. displaying a message in the server
app.listen(port,()=>{
    console.log(`this message is broadcasted at port: ${port}`)
})
// note that multiple listening ports cant be opened at once

// 1.....// to be deleted when done 
// app.listen(port, ()=>{
//     console.log("this is a demo message from bjorn strapstrup")

// }) 

// 2..... this is for displaying inside the browser
app.get("/sushila",(req,res)=>{
    res.send("Anuj Lama Gautam's wife is Sushila Lama Gautam ")

})
// 3rd step is to display the messages from the router

const d3 = require("../Supreme_Backend/route/demo_3")
app.use(d3)

