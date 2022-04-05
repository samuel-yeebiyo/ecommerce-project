import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/profile/saved.module.css'
import AuthenticatedRoute from '@/components/authenticatedRoute'
import ProductCard from '@/components/productCard'
import {useState, useEffect} from 'react'
import { fetchProducts } from 'lib/products'

export default function Orders({products}) {

  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState({})

  const toggleElement = ()=>{
    setShow(prev => !prev)
  }

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
            <p>Wishlist</p>
            <span>All saved products</span>
            <div className={styles.products}>
                {products.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                ))}
                {products.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                ))}
                {products.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                ))}
                {products.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                ))}
            </div>
          </div> 
        </main>
      </div>
    </AuthenticatedRoute>
  )
}

export async function getStaticProps(context){

    const products = await fetchProducts()
  
    return{
      props:{
        products
      }
    }
  
  
  }