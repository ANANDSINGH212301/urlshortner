import { getshortUrl } from "../dao/short_url.js";
import { shorturlServiceswithoutuser, shorturlServiceswithuser } from "../services/short_url.services.js";

export const createShortUrl = async (req, res, next) => {
    const { url } = req.body
    try {
        let shorturl
        if (req.userId) {
            shorturl = await shorturlServiceswithuser(url, req.userId)
        } else {
            shorturl = await shorturlServiceswithoutuser(url)
        }
        res.send(process.env.APP_URL + shorturl)
    } catch (error) {
        next(error)
    }
}

export const redirectFromShortUrl = async (req, res, next) => {
    const { id } = req.params
    const url = await getshortUrl(id)
    if (url) {
        res.redirect(url.full_url);
    } else {
        res.status(404).send("Not Found")
    }
}
export const createCustomShortUrl = async (req, res, next) => {
    const { url, slug } = req.body
    let shorturl;
    if (req.userId) {
        shorturl = await shorturlServiceswithuser(url, req.userId, slug)
    } else {
        shorturl = await shorturlServiceswithoutuser(url, slug)
    }
    res.send(process.env.APP_URL + shorturl)
}