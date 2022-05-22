import axios from "@/lib/api/guestAxios";

import { useEffect } from "react";
import { guestToken } from "./useCookies";
import useGuestToken from "./useGuestToken";

const useAxiosGuest = () =>{
    const newToken = useGuestToken()

    useEffect(()=>{

        const requestIntercept = axios.interceptors.request.use(
            config => {

                console.log("From guest")
                const token = guestToken()

                if(!config.headers['authorization']){
                    config.headers['authorization'] = `Bearer ${token}`
                }

                return config
            }, (error) => Promise.reject(error)
        )


        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if(error?.response?.status == 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const token = await newToken()
                    prevRequest.headers['authorization'] = `Bearer ${token}`
                    return axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return ()=>{
            axios.interceptors.response.eject(responseIntercept)
            axios.interceptors.request.eject(requestIntercept)
        }

    },[newToken])

    return axios
}

export default useAxiosGuest