import axios from 'axios'
import { guestToken } from "@/hooks/useCookies"

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_PROD_URL,
    headers:{
        'authorization': `Bearer ${guestToken()}`
    }
})
