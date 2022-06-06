import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_PROD_URL,
    headers:{
        Accept: 'application/json'
    }
})

export default axiosInstance