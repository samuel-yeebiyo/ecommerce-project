import useSWR from "swr";
import { userFetcher } from "@/lib/user";


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

    console.log("In user hook")

    const {data, mutate, error} = useSWR(`http://localhost:8000/user/get`, userFetcher, {dedupingInterval:5000})

    console.log({data})

    return{
        user_p:data?.user || null,
        error:error,
        isLoading: !error && !data,
        mutate:mutate
    }
}