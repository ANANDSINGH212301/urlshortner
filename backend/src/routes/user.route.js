import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserUrl } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/urls", authMiddleware, getUserUrl);


export default route;
