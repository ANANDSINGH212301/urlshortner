import connectDB from "./src/configs/mongodb.config.js"
import shortUrl from "./src/routes/short_url.route.js"
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";

import dotenv from "dotenv";
dotenv.config("./.env")


import express from "express"
const app = express()

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({extended:true})) // hiding the form data shared through url



//POST route -  Create a Short URL
app.use("/api/create", shortUrl)


//GET route - Redirection
app.get("/:id",redirectFromShortUrl)



app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on PORT 3000");
})