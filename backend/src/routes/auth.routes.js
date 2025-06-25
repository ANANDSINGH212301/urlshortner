import express from "express";
import { register_user, login_user, logout_user } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/register", register_user);
route.post("/login", login_user);
route.post("/logout", logout_user);
route.get("/me", authMiddleware, getCurrentUser);

export default route;
