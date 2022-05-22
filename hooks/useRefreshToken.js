import axios from "@/lib/api/axiosRefresh"
import {setCookie} from 'nookies'

const useRefreshToken = () =>{

    const refresh = async () =>{

        const response = await axios.get('/refresh')

        console.log(response.data)
        console.log("Getting refresh tokens")
        //override accessToken cookie
        setCookie(null, 'accessToken', response.data.accessToken, {path: '/'})


        //return the refresh token
        return response.data.accessToken

    }

    return refresh

}

export default useRefreshToken