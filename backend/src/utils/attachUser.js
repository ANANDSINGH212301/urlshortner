import { verifyToken } from "./helper.js"
import { findUserById } from "../dao/user.dao.js"
import { decode } from "jsonwebtoken"


export const attachUser = async(req,res, next) =>{
    const token = req.cookies.accessToken
    if (!token) {
        return next()
    }
    try {
        const decoded = await verifyToken(token)
        const user = await findUserById(decoded)
        if (!user) {
            return next()
        }
        req.userId = user._id
        next()
    } catch (error) {
       return next()
    }
}