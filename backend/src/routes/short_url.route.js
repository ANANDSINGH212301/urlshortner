import express from "express";
import { createShortUrl, createShortUrlAuth } from "../controllers/short_url.controller.js";
const route = express.Router();

route.post("/", createShortUrl)
route.post("/", createShortUrlAuth)

export default route;

