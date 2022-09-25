import {useState, useEffect} from 'react'
import {useRouter} from "next/router";

import { useUser } from '@/hooks/swrHooks';

import Cookie from 'cookie-cutter'

export default function AuthenticatedRoute({children}) {


    const {user_p, error, isLoading} = useUser()

    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        error && router.push('/signin')
    },[])

    return(
        <>
            {/* { isLoading ? <div>Loading...</div>      
                : error ? router.push('/signin') 
                    : <>{children}</>
            } */}
            {
                isLoading && <>Loading</>
            }
            {
                !error && children
            }
        </>
    )
}

