import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function Myshop(){

    const router = useRouter()

    useEffect(()=>{
        router.replace('/myshop/overview')
    },[])

    return(
        <div>
        </div>
    )
}

Myshop.Layout = ShopAdmin

export async function getServerSideProps(context){

    const cookies = nookies.get(context)
  
    console.log({cookies})
  
    if(cookies.accessToken) {
      return {
        redirect:{
          permanent:false,
          destination:'/myshop/overview'
        }
      }
    }else return {
        redirect:{
            permanent:false,
            destination:'/signin'
        }
    }
}