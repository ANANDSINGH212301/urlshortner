import express, { Router } from "express";
import { createShortUrl } from "../controllers/short_url.controller.js";
const route = express.Router();

route.post("/",createShortUrl)

export default route;

