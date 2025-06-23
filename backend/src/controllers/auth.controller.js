import { cookieOptions } from "../configs/config.js"
import { registerUserServices, loginUserServices } from "../services/auth_user.services.js"
import { wrapAsync } from "../utils/trycatchWrapper.js"

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body
    const token = await registerUserServices(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json("login Successful")
})
export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    const token = await loginUserServices(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json("login Successful")
})