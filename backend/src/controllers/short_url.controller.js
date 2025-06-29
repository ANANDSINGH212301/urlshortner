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
    try {
        console.log("Redirecting short URL:", req.params.id)
        const { id } = req.params
        const url = await getshortUrl(id)

        if (url && url.full_url) {
            res.redirect(url.full_url);
        } else {
            console.log("URL not found for ID:", id)
            res.status(404).send("Short URL not found")
        }
    } catch (error) {
        console.error("Error in redirectFromShortUrl:", error)
        next(error)
    }
}
export const createCustomShortUrl = async (req, res, next) => {
    try {
        const { url, slug } = req.body
        let shorturl;
        if (req.userId) {
            shorturl = await shorturlServiceswithuser(url, req.userId, slug)
        } else {
            shorturl = await shorturlServiceswithoutuser(url, slug)
        }
        res.send(process.env.APP_URL + shorturl)
    } catch (error) {
        next(error)
    }
}