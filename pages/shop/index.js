import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect} from 'react'
import { fetchProducts } from '../../lib/products'

import ProductCard from '../../components/productCard'

export default function Product({addToCart, products}) {
  

  useEffect(()=>{
    console.log(products)
  },[])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>This is the shop</p>

        {products.map((product, idx)=>(
          <div key={idx}>
            <Link href={`/shop/${product.pathname}`}>
              <a><ProductCard product={product}/></a>
            </Link>
          </div>
        ))

        }


      </main>
        
    </div>
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