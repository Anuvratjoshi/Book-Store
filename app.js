const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors")
const port = 8080


//requiring Connection
require("./connection/connection")

// requiring models
require("./models/book")


app.use(express.json())
app.use(cors())

//requiring routes
app.use(require("./routes/bookRoute"))

app.listen(port,()=>{
    console.log("App is listening to PORT :",port)
})