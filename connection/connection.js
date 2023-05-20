const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected",()=>{
    console.log("successfully connected with db")
})

mongoose.connection.on("error",()=>{
    console.log("Error while connected with db")
})