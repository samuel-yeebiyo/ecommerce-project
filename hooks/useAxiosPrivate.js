import axios from "@/lib/api/axiosUser";

import { useEffect } from "react";
import { accessToken } from "./useCookies";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () =>{
    const refresh = useRefreshToken()

    useEffect(()=>{

        const requestIntercept = axios.interceptors.request.use(
            config => {

                console.log("From private")
                const token = accessToken()

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
                    const newToken = await refresh()
                    prevRequest.headers['authorization'] = `Bearer ${newToken}`
                    return axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return ()=>{
            axios.interceptors.response.eject(responseIntercept)
            axios.interceptors.request.eject(requestIntercept)
        }

    },[refresh])

    return axios
}

export default useAxiosPrivate