import axiosInstance from "../utils/axiosinstance";

export const loginuser = async (email, password) => {
    const res = await axiosInstance.post("/api/login", { email, password });
    return res;
}
export const registeruser = async (name, email, password) => {
    const res = await axiosInstance.post("/api/register", { name, email, password });
    return res;
}
export const logoutuser = async () => {
    const res = await axiosInstance.post("/api/logout");
    return res;
}
