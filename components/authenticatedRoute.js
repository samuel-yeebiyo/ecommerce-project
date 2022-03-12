import {useState, useEffect} from 'react'
import {useRouter} from "next/router";

import Cookie from 'cookie-cutter'

export default function authenticatedRoute({children}) {


    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        const value = Cookie.get('userID');
        if(value){
            setLoading(false)
        }else{
            router.push('/signin')
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

