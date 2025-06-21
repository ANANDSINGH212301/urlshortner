import shortSchema from "../models/shortner.model.js"
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new shortSchema({
        full_url: longUrl,
        short_url: shortUrl
    })
    if(userId){
        newUrl.userId = userId;
    }
    newUrl.save()
}
export const getshortUrl = async(id) =>{
    const url = await shortSchema.findOneAndUpdate({short_url : id},{$inc : {clicks:1}})
    return url
}