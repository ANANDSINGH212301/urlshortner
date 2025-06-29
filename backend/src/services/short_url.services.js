import { saveShortUrl } from "../dao/short_url.js"
import { generateNanoId } from "../utils/helper.js"
import AppError from "../utils/apperror1.js"
import { getCoustomShortUrl } from "../dao/short_url.js"

export const shorturlServiceswithoutuser = async (url, slug = null) => {
    const shortpart = slug || generateNanoId(7)
    if (!shortpart) {
        throw new AppError('Failed to generate short URL', 500);
    }

    // Check if custom slug already exists
    if (slug) {
        const exist = await getCoustomShortUrl(shortpart)
        if (exist) {
            throw new AppError('Custom URL already exists', 409);
        }
    }

    await saveShortUrl(shortpart, url)
    return shortpart
}
export const shorturlServiceswithuser = async (url, userId, slug = null) => {
    const shortpart = slug || generateNanoId(7)

    if (!shortpart) {
        throw new AppError('Failed to generate short URL', 500);
    }

    const exist = await getCoustomShortUrl(shortpart)
    if (exist) {
        throw new AppError('Custom URL already exists', 409);
    }

    await saveShortUrl(shortpart, url, userId)
    return shortpart
}