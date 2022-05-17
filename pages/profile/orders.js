import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/profile/orders.module.css'
import AuthenticatedRoute from '@/components/authenticatedRoute'
import Order from '@/components/Order'
import OrderWrapper from '@/components/orderWrapper'

import nookies from 'nookies'
import Cookie from 'cookie-cutter'

import {useState, useEffect} from 'react'

export default function Orders({user}) {

  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState({})


  const [orders, setOrders] = useState([])
  const [orderMap, setOrderMap] = useState([])

  const [info, setInfo] = useState()

  useEffect(()=>{

    const userAccess = Cookie.get('accessToken')

    const fetchStats = async (token)=>{
      await fetch(`http://localhost:8000/user/get-orders`, {
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'cors',
          'authorization': `Bearer ${token}`
        },
        mode:'cors'
      }).then(async res=>await res.json()).then(data =>{
        console.log({data})
        setOrders(data.all)
        setOrderMap(data.map)
      })
    }

    fetchStats(userAccess)

  },[])


  return (
    <AuthenticatedRoute>
      <div>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={!show ? styles.container : [styles.container, styles.show].join(" ")}>
          <div className={styles.list}>         
            <p className={styles.title}>Orders</p>
            <p className={styles.subtitle}>All completed orders</p>

            {orderMap.length > 0 && orders.length>0 && orderMap.map((map)=>(
              <OrderWrapper order={map} orders={orders}/>
            ))}
          </div> 

        </main>
      </div>
    </AuthenticatedRoute>
  )
}

export async function getServerSideProps(context){

  const cookies = nookies.get(context)

  console.log({cookies})

  if(!cookies.accessToken) {
    return {
      redirect:{
        permanent:false,
        destination:'/signin'
      }
    }
  }

  return{
    props:{
      cookies
    }
  }
}