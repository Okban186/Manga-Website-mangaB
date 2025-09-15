import axios from "axios"
import { AuthContext } from "../Component/AuthProvider/AuthProvider"

const publicApi = axios.create({
    baseURL:"http://localhost:8080",
    withCredentials: false
})

const protectedApi = axios.create({
    baseURL:"http://localhost:8080",
    withCredentials: true
})



const getLastestManga = async ({pageNumber= 0,pageSize= 24 } = {}) =>{
    try{
        const result = await publicApi.get("/book/getRecentlyUpdateBook",{
            params:{
                pageNumber,pageSize
            }
        })
        return result.data
    }catch(error){
        console.log(error)
    }
}

const getMangasByTags = async ({genres = "",pageNumber =0,pageSize = 24} ={}) =>{
    try{
        const result = await publicApi.get("/book/getBooksByGenres", {
            params:{genres, pageNumber, pageSize}
        })

        return result.data
    }catch(error){
        console.log(error)
    }
}

const getHomePageSetting = async () =>{
    try{
        const result = await publicApi.get("/api/v2/setting")
        return result.data
    }catch(error){
        console.log(error)
    }
}

const getBookById = async ({id}) =>{
    try{
        const result = await publicApi.get(`/book/getBook/${id}`)
        return result.data
    }catch(error){
        console.log(error)
    }
}



const getInfo = async () => {
    try {
        const response = await protectedApi.get("/auth/me");
        return response.data; // user info
    } catch (error) {
        if (error.response?.status === 401) {
            console.log("Chưa đăng nhập hoặc JWT hết hạn");
            return null; // trả về null nếu không có thông tin user
        } else {
            console.log("Lỗi khác:", error);
            return null;
        }
    }
};




export {getLastestManga,getMangasByTags, getHomePageSetting, getInfo, publicApi, protectedApi,getBookById}