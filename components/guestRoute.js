import {useState, useEffect} from 'react'
import {useRouter} from "next/router";

import Cookie from 'cookie-cutter'

export default function guestRoute({children}) {


    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        const value = Cookie.get('userID');
        if(value){
            router.push('/')
        }else{
            setLoading(false)
        }
    },[])

    return(
        <>
            { loading ?
                <div>Loading</div>      
                    :
                <>{children}</>
            }
        </>
    )
}

