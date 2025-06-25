import { wrapAsync } from "../utils/trycatchWrapper.js";
import { getAllUserUrl } from "../dao/user.dao.js";

export const getUserUrl = wrapAsync(async (req, res) => {
    const { _id } = req.user
    const urls = await getAllUserUrl(_id)
    console.log(urls)
    req.status(200).json({ message: "Success", urls })
    return urls
})