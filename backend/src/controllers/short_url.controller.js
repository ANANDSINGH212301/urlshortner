import { getshortUrl } from "../dao/short_url.js";
import { shorturlServiceswithoutuser, shorturlServiceswithuser } from "../services/short_url.services.js";

export const createShortUrl = async (req, res, next) => {
    try {
        let shorturl
        if (req.user) {
            const { url } = req.body
            shorturl = await shorturlServiceswithuser(url)
        } else {
            const { url } = req.body
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
    console
    if (url) {
        res.redirect(url.full_url);
    } else {
        res.status(404).send("Not Found")
    }
}
export const createCoustomShortUrl = async (req, res, next) => {
    const { url, slug } = req.body
    let shorturl;
    if (req.user) {
        shorturl = await shorturlServiceswithuser(url, req.user._id, slug)
    } else {
        shorturl = await shorturlServiceswithoutuser(url, slug)
    }
    res.send(process.env.APP_URL + shorturl)
}