import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/orders.module.css'

export default function orders(){
    return(
        <div>
            <Head>
                <title>My Shop</title>
            </Head>
            <main className={styles.overview_container}>
                <div className={styles.orders}>
                    <p className={styles.title}>Pending Orders</p>
                    <div className={styles.order_container}>
                        <p>No pending order</p>
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