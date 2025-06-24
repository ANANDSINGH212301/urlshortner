import connectDB from "./src/configs/mongodb.config.js"
import shortUrl from "./src/routes/short_url.route.js"
import authRoutes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import errorHandler from './src/utils/errorhandler.js';
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import cors from "cors";


import dotenv from "dotenv";
dotenv.config("./.env")


import express from "express"
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({ extended: true })) // hiding the form data shared through url
app.use(cookieParser())


app.use(attachUser)

//POST route -  Create a Short URL
app.use("/api/create", shortUrl)
app.use("/api/auth", authRoutes)


//GET route - Redirection
app.get("/:id", redirectFromShortUrl)

// Handling Errors
// Global error middleware
app.use(errorHandler);

app.listen(3000, () => {
    connectDB()
    console.log("Server is running on PORT 3000");
})