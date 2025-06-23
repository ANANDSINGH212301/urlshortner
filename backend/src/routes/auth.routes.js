import express from "express";
import { register_user, login_user } from "../controllāers/auth.controller.js";
const route = express.Router();

route.post("/register", register_user);
route.post("/login", login_user);

export default route;
