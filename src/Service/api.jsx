import axios from "axios"
import { AuthContext } from "../Component/AuthProvider/AuthProvider"

const publicApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false
})

const protectedApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
})



const getLastestManga = async ({ pageNumber = 1, pageSize = 24 } = {}) => {
  try {
    const result = await publicApi.get("/book/getRecentlyUpdateBook", {
      params: {
        pageNumber, pageSize
      }
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const getMangasByTags = async ({ genres = "", pageNumber = 1, pageSize = 24 } = {}) => {
  try {
    const result = await publicApi.get("/book/getBooksByGenres", {
      params: { genres, pageNumber, pageSize }
    })

    return result.data
  } catch (error) {
    console.log(error)
  }
}

const getHomePageSetting = async () => {
  try {
    const result = await publicApi.get("/api/v2/setting")
    return result.data
  } catch (error) {
    console.log("Loi khi lay HomePageSetting")
  }
}

const getBookById = async ({ id }) => {
  try {
    const result = await publicApi.get(`/book/getBook/${id}`)
    return result.data
  } catch (error) {
    console.log("Truyen nay co the khong ton tai hoac url sai")
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
      console.log("Lỗi khác");
      return null;
    }
  }
};

const searchBook = async ({ q, pageNumber = 1, pageSize = 24 }) => {
  try {
    const result = await publicApi.get("/book/searchBook", {
      params: { q, pageNumber, pageSize }
    })
    return result.data;
  } catch (error) {
    console.log("Search bi loi mat roi")
  }
}

const searchBookUseKeyWordAndGenre = async ({ q = "", genres = "", pageNumber = 1, pageSize = 24 }) => {
  try {
    const result = await publicApi.get("/book/searchBookNandG", {
      params: { q, genres, pageNumber, pageSize }
    })
    return result.data;

  } catch (error) {
    console.log("Search bi loi mat roi")
  }
}





export {
  getLastestManga, getMangasByTags, getHomePageSetting,
  getInfo, publicApi, protectedApi, getBookById, searchBook, searchBookUseKeyWordAndGenre
}
