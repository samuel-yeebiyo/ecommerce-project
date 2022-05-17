import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import styles from 'styles/base/stats.module.css'

export default function stats(){

    const router = useRouter()

    useEffect(()=>{
        // router.replace('/myshop/overview')
    },[])

    return(
        <section className={styles.overview_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main >
               <p>Shop Stats</p>
               <div>
                   Graph
               </div>
               <p>Listings</p>
               <div>
                   Table of listings and information about them
                   Name, Category, rating, views, sales, revenue, createdAt
               </div>
            </main>
        </section>
    )
}

stats.Layout = ShopAdmin