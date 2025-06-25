import axiosInstance from "../utils/axiosinstance";

export const loginuser = async (email, password) => {
    const res = await axiosInstance.post("/api/auth/login", { email, password });
    return res;
}
export const registeruser = async (name, email, password) => {
    const res = await axiosInstance.post("/api/auth/register", { name, email, password });
    return res;
}
export const logoutuser = async () => {
    const res = await axiosInstance.post("/api/auth/logout");
    return res;
}
export const getCurrentUser = async () => {
    const data = await axiosInstance.get("/api/auth/me");
    return data;
}
