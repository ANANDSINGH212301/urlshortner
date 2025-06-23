import shortSchema from "../models/shortner.model.js"
import { wrapAsync } from "../utils/trycatchWrapper.js";
export const saveShortUrl = wrapAsync(async (shortUrl, longUrl, userId) => {
    const newUrl = new shortSchema({
        full_url: longUrl,
        short_url: shortUrl
    })
    if (userId) {
        newUrl.userId = userId;
    }
    newUrl.save()
})
export const getshortUrl = wrapAsync(async (id) => {
    const url = await shortSchema.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } })
    return url
})

export const getCoustomShortUrl = wrapAsync(async (slug) => {
    return await shortSchema.findOne({ short_url: slug })
})