import { getshortUrl } from "../dao/short_url.js";
import { shorturlServiceswithoutuserId } from "../services/short_url.services.js";

export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body
        const shorturl = await shorturlServiceswithoutuserId(url)
        res.send(process.env.APP_URL + shorturl)
    } catch (error) {
        next(err);
    }
}
export const redirectFromShortUrl = async (req, res,next) => {
    try {
        const { id } = req.params
        const url = await getshortUrl(id)
        if (url) {
            res.redirect(url.full_url);
        } else {
            res.status(404).send("Not Found")
        }
    } catch (error) {
        next(err);
    }
}