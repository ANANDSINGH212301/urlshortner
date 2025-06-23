import { getshortUrl } from "../dao/short_url.js";
import { shorturlServiceswithoutuser, shorturlServiceswithuser } from "../services/short_url.services.js";
import { wrapAsync } from "../utils/trycatchWrapper.js";

export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body
        const shorturl = await shorturlServiceswithoutuser(url)
        res.send(process.env.APP_URL + shorturl)
    } catch (error) {
        next(error)
    }
}
export const createShortUrlAuth = async (req, res, next) => {
    try {
        const { url } = req.body
        const shorturl = await shorturlServiceswithuser(url, req.user._id)
        res.send(process.env.APP_URL + shorturl)
    }catch(error){
        next(error)
    }
}

export const redirectFromShortUrl = async(req, res, next) => {
    const { id } = req.params
    console.log(await getshortUrl(id))
    const url = await getshortUrl(id)
    console.log(url)
    if (url) {
        res.redirect(url.full_url);
    } else {
        res.status(404).send("Not Found")
    }
}
export const createCoustomShortUrl = async (req, res, next) => {
    const { url, slug } = req.body
    console.log("hhee")
    let shorturl;
    if (req.user) {
        shorturl = await shorturlServiceswithuser(url, req.user._id, slug)
    } else {
        shorturl = await shorturlServiceswithoutuser(url, slug)
    }
    res.send(process.env.APP_URL + shorturl)
}