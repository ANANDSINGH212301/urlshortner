import express from "express";
import { register_user, login_user, logout_user, getCurrentUser} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/urls",authMiddleware, getAllUserUrl);


export default route;
