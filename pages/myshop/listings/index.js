import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from '/styles/shopadmin/listings.module.css'
import EditCard from '@/components/EditCard'
import CreateListing from '@/components/createlisting'


export default function listings({listings, shop, toggleLoading}){

    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState({})
    const [show,setShow]= useState(false)
    // const editing = useRef({})
    const [editing, setEditing] = useState({})

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
        return shop
    }

    const edit = (product)=>{
        // editing.current = product;
        setEditing(product)
        showElement()
    }

    useEffect(()=>{

        const fetchShopInfo = async() =>{
            await fetch(`http://localhost:8000/products/get/multiple`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode:'cors',
                body:JSON.stringify({
                    listings:listings
                })
            }).then(async res=> await res.json()).then(data=>{
                setProducts(data.products)
            })
        }
        
        if(listings.length >0) fetchShopInfo()

    },[listings])

    return(
        <div>
            <Head>
                <title>My Shop</title>
            </Head>
            <main className={!show ? styles.overview_container : [styles.overview_container, styles.show].join(" ")}>
                <div className={styles.listings}>
                    <p className={styles.title}>All Listings</p>
                    <div className={styles.catalog}>
                        {products.length >0 && 
                            products.map((item)=>(
                                <EditCard product={item} edit={edit}/>
                            ))
                        }
                    </div>
                    <div>
                        <button onClick={()=>showElement()}>Add Listing</button>
                    </div>
                </div>
                <div className={styles.details}>
                        <button className={styles.cancel} onClick={()=>hideElement()}>Cancel</button>
                        <CreateListing shop={getShopId} loading={toggleLoading} editing={editing}/>
                </div>
            </main>
        </div>
    )
}

listings.Layout = ShopAdmin