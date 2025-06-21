import express from "express"
import { nanoid } from "nanoid"
import connectDB from "./src/mongodb.config";
import dotenv from "dotenv";
dotenv.config("./.env")
const app = express()

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({extended:true}))


//POST route -  Create a Short URL
app.post("/api/create",(req,res)=>{
    const url = req.body
    console.log(url)
    res.send(nanoid(7))
})


//GET route - Redirection



app.listen(3000,()=>{
    console.log("Server is running on PORT 3000");
})