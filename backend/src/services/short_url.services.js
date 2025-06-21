import { saveShortUrl } from "../dao/short_url.js"
import { generateNanoId } from "../utils/helper.js"


export const shorturlServiceswithoutuserId= async (url) => {
    const shortpart = await generateNanoId(7)
    await saveShortUrl(shortpart,url)
    return shortpart
}
export const shorturlServiceswithuserId= async (url, userId) => {
    const shortpart = await generateNanoId(7)
    await saveShortUrl(shortpart,url,userId)
    return shortpart
}