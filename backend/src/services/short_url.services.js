import { saveShortUrl } from "../dao/short_url.js"
import { generateNanoId } from "../utils/helper.js"
import AppError from "../utils/apperror1.js"

export const shorturlServiceswithoutuser = async (url) => {
    const shortpart = generateNanoId(7)
    if (!shortpart) {
        throw new AppError('User not found', 404);
    }
    saveShortUrl(shortpart, url)
    return shortpart
}
export const shorturlServiceswithuser = async (url, userId, slug = null) => {
    const shortpart = slug || generateNanoId(7)
    const exist = await getCoustomShortUrl(slug)
    if (exist) {
        throw new AppError('coustom url already exist');
    }
    if (!shortpart) {
        throw new AppError('User not found', 404);
    }
    saveShortUrl(shortpart, url, userId)
    return shortpart
}