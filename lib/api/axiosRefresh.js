import axios from 'axios'
import { refreshToken } from "@/hooks/useCookies"

export default axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
        'authorization': `Bearer ${refreshToken()}`
    }
})
