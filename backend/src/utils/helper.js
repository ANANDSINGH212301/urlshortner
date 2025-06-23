import { nanoid } from "nanoid"
import jwt, { decode } from "jsonwebtoken"

export const generateNanoId = (length) => {
    const shortpart = nanoid(length)
    return shortpart
}

export const signToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = async (token) => {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    return decoded.id
}