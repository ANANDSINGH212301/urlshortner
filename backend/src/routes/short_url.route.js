import express from "express";
import { createShortUrl, createCoustomShortUrl} from "../controllers/short_url.controller.js";
const route = express.Router();

route.post("/", createShortUrl)
route.post("/", createCoustomShortUrl)

export default route;

