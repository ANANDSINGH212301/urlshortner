import { createUser, findUserByEmail } from "../dao/user.dao.js"
import { signToken } from "../utils/helper.js"

export const registerUserServices = async (name, email, password) => {
    const user = await findUserByEmail({ email: email })
    if (user) { throw new ConflictError("User Already Exist") }
    const newUser = await createUser(name, email, password)
    const token = await signToken({ id: newUser._id })
    return token
}

export const loginUserServices = async (email, password) => {
    const user = await findUserByEmail({ email: email })
    if (!user || user.password !== password) { throw new NotFoundError("Invalid Credentials") }
    const token = await signToken({ id: user._id })
    return { token, user }
}