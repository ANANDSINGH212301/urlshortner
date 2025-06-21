import { nanoid } from "nanoid"

export const generateNanoId = (length) => {
    const shortpart =  nanoid(length)
    return shortpart
}