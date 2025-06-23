import shortSchema from "../models/shortner.model.js"
import { wrapAsync } from "../utils/trycatchWrapper.js";
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new shortSchema({
            full_url: longUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.userId = userId;
        }
        newUrl.save()
    } catch (error) {
        throw error
    }

}
export const getshortUrl = async (id) => {
    try {
        const url = await shortSchema.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } })
        return url
    } catch (error) {
        throw error
    }
}

export const getCoustomShortUrl = async (slug) => {
    try {
        return await shortSchema.findOne({ short_url: slug })
    } catch (error) {
        throw error
    }
}