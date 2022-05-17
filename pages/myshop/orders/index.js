import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/orders.module.css'
import nookies from 'nookies'
import OrderWrapper from '@/components/orderWrapper'


export default function orders(){

    const [pending, setPending] = useState([])
    const [shipped, setShipped] = useState([])
    const [completed, setCompleted] = useState([])

    const [orderMap, setOrderMap] = useState([])
    const [allOrders, setAllOrders] = useState([])

    useEffect(()=>{

        const {accessToken} = nookies.get()
        //fetching orders from server
        const fetchOrders = async ()=>{
            await fetch('http://localhost:8000/shops/orders',{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${accessToken}`
                }
            }).then(async res =>await res.json())
            .then(data =>{
                console.log(data)

                setOrderMap(data.map)
                setAllOrders(data.all)

                // setPending(data.filter((item)=> item.status == 'pending'))
                // setShipped(data.filter((item)=> item.status == 'shipped'))
                // setCompleted(data.filter((item)=> item.status == 'delivered'))

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
                        {orderMap.length > 0 && allOrders.length>0 ? orderMap.map((map)=>(
                                <OrderWrapper order={map} orders={allOrders}/>
                            )) : <p>No pending orders</p>}
                    </div>
                </div>
                <div className={styles.orders}>
                    <p className={styles.title}>Completed Orders</p>
                    <div className={styles.order_container}>
                        <p>No pending order</p>
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