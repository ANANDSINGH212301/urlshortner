import { saveShortUrl } from "../dao/short_url.js"
import { generateNanoId } from "../utils/helper.js"
import AppError from "../utils/apperror1.js"
import { getCoustomShortUrl } from "../dao/short_url.js"

const validateUrl = (url) => {
    try {
        const parsed = new URL(url)
        if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new AppError("Invalid URL format", 400)
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error
        }
        throw new AppError("Invalid URL format", 400)
    }
}

const validateSlug = (slug) => {
    if (!slug) return
    const isValid = /^[a-zA-Z0-9-]+$/.test(slug)
    if (!isValid) {
        throw new AppError("Slug can only contain letters, numbers, and hyphens", 400)
    }
}

export const shorturlServiceswithoutuser = async (url, slug = null) => {
    validateUrl(url)
    validateSlug(slug)
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
    validateUrl(url)
    validateSlug(slug)
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