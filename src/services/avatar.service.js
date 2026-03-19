import api from "./api";

export const getAvatar = async () =>{
    const response = await api.get("/avatar");
    return response.data;
}
