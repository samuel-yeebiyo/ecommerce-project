import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/overview.module.css'
import {useState, useEffect} from 'react'
import Cookie from 'cookie-cutter'

export default function myshop({listings}){

    // const [listings, setListings] = useState(0)
    const [sales, setSales] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(()=>{
        const user = Cookie.get('userID')

        const fetchShopInfo = () =>{
            fetch(`http://localhost:8000/user/${user}/get-shop`, {
                method:'GET',
                headers:{
                    'Content-Type':'appllication/json',
                    'Access-Control-Allow-Origin':'*'
                },
                mode:'cors',
            }).then(async res=> await res.json()).then(data=>{
                console.log(data)
                // setListings(data.listings)
                setSales(data.sales)
                setRevenue(data.revenue)
            })
        }
        

        fetchShopInfo()

    },[])


    return(
        <div>
            <Head>
                <title>My Shop</title>
            </Head>
            <main className={styles.overview_container}>
                <p className={styles.welcome}>Welcome Sam</p>
                <div className={styles.boards}>
                    <div className={styles.board}>
                        <p className={styles.board_title}>Listings</p>
                        <p className={styles.value}>{listings.length}</p>
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
                        <p>No pending order</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

myshop.Layout = ShopAdmin