import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/overview.module.css'
import {useState, useEffect} from 'react'
import Cookie from 'cookie-cutter'
import OrderWrapper from '@/components/orderWrapper'
import nookies from 'nookies'

export default function myshop({cookies}){

    const [listings, setListings] = useState(0)
    const [sales, setSales] = useState(0)
    const [revenue, setRevenue] = useState(0)

    const [orderMap, setOrderMap] = useState([])
    const [allOrders, setAllOrders] = useState([])

    useEffect(()=>{
        const accessToken = cookies.accessToken

        const fetchShopInfo = async () =>{
            await fetch(`http://localhost:8000/user/get-shop`, {
                method:'GET',
                headers:{
                    'Content-Type':'appllication/json',
                    'Access-Control-Allow-Origin':'*',
                    'authorization':`Bearer ${accessToken}`
                },
                mode:'cors',
            }).then(async res=> await res.json()).then(data=>{
                console.log(data)
                setListings(data.listings)
                setSales(data.sales)
                setRevenue(data.revenue)
            })
        }
        
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


        fetchShopInfo()

    },[])


    return(
        <section className={styles.overview_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main >
                <p className={styles.welcome}>Welcome, *name*</p>
                <div className={styles.boards}>
                    <div className={styles.board}>
                        <p className={styles.board_title}>Listings</p>
                        <p className={styles.value}>{listings}</p>
                    </div>
                    <div className={styles.board}>
                        <p className={styles.board_title}>Sales</p>
                        <p className={styles.value}>{sales}</p>
                    </div>
                    <div className={styles.board}>
                        <p className={styles.board_title}>Revenue</p>
                        <p className={styles.value}>{revenue}</p>
                    </div>
                </div>
                <div className={styles.orders}>
                    <p className={styles.title}>Pending Orders</p>
                    <div className={styles.order_container}>
                        {orderMap.length > 0 && allOrders.length>0 ? orderMap.map((map)=>(
                            <OrderWrapper order={map} orders={allOrders}/>
                        )) : <p>No pending orders</p>}
                    </div>
                </div>
            </main>
        </section>
    )
}

myshop.Layout = ShopAdmin

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