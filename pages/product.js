import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/product.module.css'

export default function Product({increment, addToCart}) {
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>This is the product</p>
        <div className={styles.product}>
          <div className={styles.image}></div>
          <button className={styles.add} onClick={()=>{
            addToCart({
              productId:1234,
              name:"Sample Product",
              price:20
            })
          }}>Add to cart</button>
        </div>
        <div className={styles.product}>
          <div className={styles.image}></div>
          <button className={styles.add} onClick={()=>{
            addToCart({
              productId:5678,
              name:"Sample Product",
              price:10
            })
          }}>Add to cart</button>
        </div>
        <div className={styles.product}>
          <div className={styles.image}></div>
          <button className={styles.add} onClick={()=>{
            addToCart({
              productId:9101,
              name:"Sample Product",
              price:5
            })
          }}>Add to cart</button>
        </div>
      </main>
        
    </div>
  )
}