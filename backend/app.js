import connectDB from "./src/configs/mongodb.config.js"
import shortUrl from "./src/routes/short_url.route.js"
import authRoutes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import errorHandler from './src/utils/errorhandler.js';
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import userRouter from "./src/routes/user.route.js";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


import dotenv from "dotenv";
dotenv.config()


import express from "express"
const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDistPath = path.resolve(__dirname, "../frontend/dist")
const frontendIndexPath = path.join(frontendDistPath, "index.html")
const hasFrontendBuild = fs.existsSync(frontendDistPath)

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(express.json());  // Accepting Body parser
app.use(express.urlencoded({ extended: true })) // hiding the form data shared through url
app.use(cookieParser())


if (hasFrontendBuild) {
    app.use(express.static(frontendDistPath))
}

app.use(attachUser)

//POST route -  Create a Short URL
app.use("/api/create", shortUrl)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRouter)


//GET route - Redirection
app.get("/:id", redirectFromShortUrl)

// SPA Fallback Route (catch-all for frontend routing)
app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next()
    }
    if (hasFrontendBuild) {
        return res.sendFile(frontendIndexPath)
    }
    if (process.env.CLIENT_URL) {
        return res.redirect(`${process.env.CLIENT_URL}${req.path}`)
    }
    return res.status(404).json({ message: "Frontend build not found. Run frontend build or set CLIENT_URL." })
})

// Handling Errors
// Global error middleware
app.use(errorHandler);
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error.message)
        process.exit(1)
    }
}

startServer()

