import axios from 'axios'

export const baseUrl = 'http://192.168.10.77:4000'

const axiosInstance = axios.create({
    baseURL:baseUrl
})

axiosInstance.interceptors.response.use(
    res=>res.data,
    err=>{
        console.log(err,'网络错误')
    }
)

export {axiosInstance}
