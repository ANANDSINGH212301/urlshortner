import axiosInstance from "../utils/axiosinstance";

export const createShortUrl = async (url) => {
    const {data} = await axiosInstance.post("/api/create", {url});
    return data;
}
export const createCustomShortUrl = async (url, slug) => {
    const {data} = await axiosInstance.post("/api/create/custom", {url, slug});
    return data;
}
export const getUserUrls = async () => {
    const {data} = await axiosInstance.get("/api/create");
    return data;
}