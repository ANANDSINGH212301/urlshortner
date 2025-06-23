import express from "express";
import { createShortUrl, createCustomShortUrl } from "../controllers/short_url.controller.js";
const route = express.Router();

route.post("/", createShortUrl)
route.post("/custom", createCustomShortUrl)


export default route;

