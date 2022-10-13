const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE,()=>{
//     console.log("Database is always connected successfully")
// });


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log(`the connection to the database has been achieved your highness`)
})