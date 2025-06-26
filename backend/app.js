import connectDB from "./src/configs/mongodb.config.js"
import shortUrl from "./src/routes/short_url.route.js"
import authRoutes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import errorHandler from './src/utils/errorhandler.js';
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import userRouter from "./src/routes/user.route.js";
import cors from "cors";


import dotenv from "dotenv";
dotenv.config("./.env")


import express from "express"
const app = express()
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({ extended: true })) // hiding the form data shared through url
app.use(cookieParser())


app.use(attachUser)

//POST route -  Create a Short URL
app.use("/api/create", shortUrl)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRouter)


//GET route - Redirection
app.get("/:id", redirectFromShortUrl)

// Handling Errors
// Global error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on PORT ${PORT}`);
})

// Export for Vercel
export default app;