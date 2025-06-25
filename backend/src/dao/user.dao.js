import shortSchema from "../models/shortner.model.js"
import userModel from "../models/user.model.js"
import { wrapAsync } from "../utils/trycatchWrapper.js"

export const findUserByEmail = async (email) => {
    return await userModel.findOne(email)
}
export const findUserByEmailAndPassword = async (email) => {
    return await userModel.findOne(email).select("+password")
}
export const findUserById = async (id) => {
    return await userModel.findById(id)
}

export const createUser = async (name, email, password) => {
    try {
        const newUser = new userModel({ name, email, password })
        const savedUser = await newUser.save()
        return savedUser
    } catch (error) {
        throw error
    }
}
export const getAllUserUrl = async (id) => {
    console.log(await shortSchema.find({ user: id }))
    return await shortSchema.find({ user: id })
}
