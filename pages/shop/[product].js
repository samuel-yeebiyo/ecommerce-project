import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/product.module.css'

import { fetchProductPaths, fetchProducts, fetchProduct } from '../../lib/products'

export default function Product({increment, addToCart, product, blocking}) {


  
  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.product_wrapper}>
        <div className={styles.product_container}>
          <div className={styles.main_product}>
            <div className={styles.product_image}>

            </div>
            <div className={styles.product_details}>
              <p className={styles.product_name}>{product.name}</p>
              <p className={styles.product_price}>${product.price}</p>
              <button className={blocking ? styles.blocking : styles.add} onClick={()=>{
                
                //adding to cart
                if(!blocking){
                  addToCart({
                    productId:product._id,
                    name:product.name,
                    price:product.price
                  })
                }
              
              }}>{blocking ? "Adding.." :"Add to cart"}</button>
              <div className={styles.product_description}>
                <p className={styles.pd}>Product Description</p>
                <p className={styles.desc}>{product.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
        
    </div>
  )
}

//Turn into a dynamic route
export async function getStaticPaths(){
  const paths = await fetchProductPaths();
  return {
      paths:paths,
      fallback:false
  }
}

export async function getStaticProps({params}){

  let product = await fetchProduct(params.product)

  return {
    props:{
      product:product
    }
  }
}