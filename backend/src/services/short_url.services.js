import { saveShortUrl } from "../dao/short_url.js"
import { generateNanoId } from "../utils/helper.js"
import AppError from "../utils/apperror1.js"

export const shorturlServiceswithoutuserId = async (url) => {
    const shortpart = await generateNanoId(7)
    if (!shortpart) {
        throw new AppError('User not found', 404);
    }
    await saveShortUrl(shortpart, url)
    return shortpart
}
export const shorturlServiceswithuserId = async (url, userId) => {
    const shortpart = await generateNanoId(7)
     if (!shortpart) {
        throw new AppError('User not found', 404);
    }
    await saveShortUrl(shortpart, url, userId)
    return shortpart
}