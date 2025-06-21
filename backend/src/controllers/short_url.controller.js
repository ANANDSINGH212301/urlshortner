import { shorturlServices } from "../services/short_url.services.js";
export const createShortUrl = async (req,res)=>{
    const {url} = req.body
    const shorturl = await shorturlServices(url)
    res.send(process.env.APP_URL + shorturl)
}