import { createUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/user.dao.js"
import { signToken } from "../utils/helper.js"
import AppError from "../utils/apperror1.js"

export const registerUserServices = async (name, email, password) => {
    const user = await findUserByEmail({ email: email })
    if (user) { throw new AppError("User already exists", 409) }
    const newUser = await createUser(name, email, password)
    const token = await signToken({ id: newUser._id })
    return { token, user: newUser }
}

export const loginUserServices = async (email, password) => {
    const user = await findUserByEmailAndPassword({ email: email })
    if (!user) { throw new AppError("Invalid credentials", 401) }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) { throw new AppError("Invalid credentials", 401) }
    const token = await signToken({ id: user._id })
    return { token, user }
}