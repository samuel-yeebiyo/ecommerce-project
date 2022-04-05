import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import { useRouter } from 'next/router'

export default function myshop(){

    const router = useRouter()

    useEffect(()=>{
        router.replace('/myshop/overview')
    },[])

    return(
        <div>
            {/* <Head>
                <title>My Shop</title>
            </Head>
            <main>
                <div>
                    <p>My shop</p>
                </div>
            </main> */}
        </div>
    )
}

myshop.Layout = ShopAdmin