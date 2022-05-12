import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from '/styles/shopadmin/listings.module.css'
import EditCard from '@/components/EditCard'
import CreateListing from '@/components/createlisting'
import nookies from 'nookies'
import { useUser } from '@/hooks/swrHooks'


export default function listings({shop, toggleLoading, cookies}){

    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState({})
    const [show,setShow]= useState(false)
    // const editing = useRef({})
    const [editing, setEditing] = useState({})

    const {user_p, error, isLoading} = useUser()

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

        const accessToken = cookies.accessToken

        const fetchShopInfo = async() =>{

            console.log("Fetching multiple")

            await fetch(`http://localhost:8000/products/get-multiple`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'authorization':`Bearer ${accessToken}`
                },
                mode:'cors',
            }).then(async res=> await res.json()).then(data=>{
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
                    <div>
                        <button onClick={()=>showElement()}>Add Listing</button>
                    </div>
                </div>
                <div className={styles.details}>
                        <button className={styles.cancel} onClick={()=>hideElement()}>Cancel</button>
                        <CreateListing shop={getShopId} loading={toggleLoading} editing={editing} cookies={cookies}/>
                </div>
            </main>
        </div>
    )
}

listings.Layout = ShopAdmin

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