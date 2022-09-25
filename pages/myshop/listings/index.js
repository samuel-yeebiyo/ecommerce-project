import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from '/styles/shopadmin/listings.module.css'
import EditCard from '@/components/EditCard'
import CreateListing from '@/components/createlisting'
import nookies from 'nookies'
import { useUser } from '@/hooks/swrHooks'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function Listings({shop, toggleLoading, cookies}){

    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState({})
    const [show,setShow]= useState(false)
    // const editing = useRef({})
    const [editing, setEditing] = useState({})

    const {user_p, error, isLoading} = useUser()
    const axiosPriv = useAxiosPrivate()

    const showElement = ()=>{
        setShow(true)
    }
    const hideElement = ()=>{
        // editing.current = {}
        setEditing(prev => {
            let temp = {}
            return temp
        })
        setShow(false)
    }

    const getShopId= async ()=>{
        return user_p.shopId
    }

    const edit = (product)=>{
        // editing.current = product;
        setEditing(product)
        showElement()
    }

    useEffect(()=>{

        const fetchShopInfo = async() =>{

            console.log("Fetching multiple")

            await axiosPriv.get('/products/get-multiple').then(res => res.data)
            .then(data => {
                setProducts(data.products)
            })

        }
        
       fetchShopInfo()

    },[])

    return(
        <div className={styles.main_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main className={!show ? styles.overview_container : [styles.overview_container, styles.show].join(" ")}>
                <div className={styles.listings}>
                    <p className={styles.title}>All Listings</p>
                    <div className={styles.catalog}>
                        {products.length >0 && 
                            products.map((item)=>(
                                <EditCard product={item} edit={edit} cookies={cookies}/>
                            ))
                        }
                    </div>
                    <div className={styles.add}>
                        <button onClick={()=>showElement()}>Add Listing</button>
                    </div>
                </div>
                <div className={styles.details}>
                        <button className={styles.cancel} onClick={()=>hideElement()}>Cancel</button>
                        <CreateListing editing={editing} cookies={cookies}/>
                </div>
            </main>
        </div>
    )
}

Listings.Layout = ShopAdmin

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