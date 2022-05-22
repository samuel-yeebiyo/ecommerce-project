import useSWR from "swr";
import useAxiosPrivate from "./useAxiosPrivate";
import { accessToken } from "./useCookies";


const fetcher =  (...args) => fetch(...args).then(res => res.json()) 

export function useProducts(init) {
    const {data, error} = useSWR('http://localhost:8000/products/get-all', fetcher, {initialData: init, dedupingInterval:10000})

    return{
        allProducts:data,
        error:error,
        isLoading: !error && !data
    }
}

export function useUser() {

    const axiosPriv = useAxiosPrivate()
    const token = accessToken()

    console.log("In swr trying to fetch")

    const fetching = (url) => {            
        console.log("Requesting for user data")
        return axiosPriv.get(url).then(response => response.data)
    }
    const {data, mutate, error, isValidating} = useSWR(token ? '/user/get' : null, fetching, {dedupingInterval:5000})

    return{
        user_p:data?.user || null,
        error:error,
        isLoading: !error && !data && isValidating,
        mutate:mutate
    }
}