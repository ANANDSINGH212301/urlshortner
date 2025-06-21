import { nanoid } from "nanoid"
import connectDB from "./src/configs/mongodb.config.js";
import shortSchema from "./src/models/shortner.model.js";
import shortUrl from "./src/routes/short_url.route.js"


import dotenv from "dotenv";
dotenv.config("./.env")


import express from "express"
const app = express()

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({extended:true})) // hiding the form data shared through url



//POST route -  Create a Short URL
app.use("/api/create", shortUrl)


//GET route - Redirection
app.get("/:id",async (req,res)=>{
    const {id} = req.params
    const url = await shortSchema.findOne({short_url : id})
    if(url){
        res.redirect(url.full_url);
    }else{
        res.status(404).send("Not Found")
    }
})



app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on PORT 3000");
})