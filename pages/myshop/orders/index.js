import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/orders.module.css'
import nookies from 'nookies'
import OrderWrapper from '@/components/orderWrapper'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

import {BsClipboardX} from 'react-icons/bs'

export default function orders(){

    const [pending, setPending] = useState([])
    const [shipped, setShipped] = useState([])
    const [completed, setCompleted] = useState([])

    const [orderMap, setOrderMap] = useState([])
    const [allOrders, setAllOrders] = useState([])

    const axiosPriv = useAxiosPrivate()

    useEffect(()=>{
        
        //fetching orders from server
        const fetchOrders = async ()=>{

            await axiosPriv.get('/shops/orders').then(res => res.data)
            .then(data => {
                console.log(data)

                setOrderMap(data.map)
                setAllOrders(data.all)

            })

        }


        fetchOrders()

    },[])

    return(
        <div className={styles.overview_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main>
                <div className={styles.orders}>
                    <p className={styles.title}>Pending Orders</p>
                    <div className={styles.order_container}>
                        {orderMap.length > 0 && allOrders.length > 0 ? orderMap.map((map)=>(
                            map.status == 'pending' && <OrderWrapper order={map} orders={allOrders} shop={true}/>
                        )) :
                        <div className={styles.empty}>
                            <BsClipboardX size={80}/>
                            <p>No pending orders</p>
                        </div>}
                    </div>
                </div>
                <div className={styles.orders}>
                    <p className={styles.title}>Completed Orders</p>
                    <div className={styles.order_container}>
                        {orderMap.length > 0 && allOrders.length > 0 ? orderMap.map((map)=>(
                            map.status == 'shipped' && <OrderWrapper order={map} orders={allOrders} shop={true}/>
                        )) :
                        <div className={styles.empty}>
                            <BsClipboardX size={80}/>
                            <p>No pending orders</p>
                        </div>}
                    </div>
                </div>

                
            </main>
        </div>
    )
}

orders.Layout = ShopAdmin

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