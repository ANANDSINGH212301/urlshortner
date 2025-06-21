import shortSchema from "../models/shortner.model.js"
import { generateNanoId } from "../utils/helper.js"


export const shorturlServices = async (url) => {
    const shortpart = await generateNanoId(7)
    const newUrl = new shortSchema({
        full_url: url,
        short_url: shortpart
    })
    newUrl.save()
    return shortpart
}