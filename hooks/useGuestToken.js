import axios from "@/lib/api/baseAxios"
import {setCookie} from 'nookies'

const useGuestToken = () =>{

    const getToken = async () =>{

        const response = await axios.get('/guest/token')

        console.log(response.data)
        console.log("Getting new guest token")
        
        //set or override guestToken cookie
        setCookie(null, 'guestToken', response.data.guestToken, {path: '/'})


        //return the refresh token
        return response.data.guestToken

    }

    return getToken

}

export default useGuestToken