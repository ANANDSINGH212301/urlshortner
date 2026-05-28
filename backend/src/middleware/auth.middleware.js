import { verifyToken } from "../utils/helper.js"
import { findUserById } from "../dao/user.dao.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" })
    }
    try {
        const decoded = await verifyToken(token)
        const user = await findUserById(decoded)
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Not authenticated" })
    }
} 