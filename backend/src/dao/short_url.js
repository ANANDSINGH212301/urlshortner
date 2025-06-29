import shortSchema from "../models/shortner.model.js"
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new shortSchema({
            full_url: longUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save()
    } catch (error) {
        throw error
    }

}
export const getshortUrl = async (id) => {
    try {
        console.log("Searching for short_url:", id)
        const url = await shortSchema.findOneAndUpdate(
            { short_url: id },
            { $inc: { clicks: 1 } },
            { returnDocument: 'after' } // Return the updated document
        )
        return url
    } catch (error) {
        console.error("Database error in getshortUrl:", error)
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