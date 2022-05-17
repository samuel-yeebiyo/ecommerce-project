import Head from 'next/head'
import Filter from '@/components/modals/filter'
import styles from '../styles/base/search.module.css'
import ProductCard from '@/components/productCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Search(){

    const router = useRouter()
    const {value} = router.query

    const [modal, setModal] = useState()

    const [results, setResults] = useState([])


    const applyFilter = (min, max, category, sortby) =>{

        let filtered = results

        //filter price
        if(min>0 || max>0){
            filtered = filtered.filter(item => item.price >= min)
            filtered = filtered.filter(item => item.price <= max)
        }

        //filter category
        if(category != "" || category != "-- Category"){
            filtered = filtered.filter(item => item.category == category)
        }

        //sorting
        if(sortby != "none"){
            switch (sortby){
                case "lowest_price":
                    filtered = filtered.sort((a,b)=> a.price - b.price)
                    break
                case "highest_price":
                    filtered = filtered.sort((a,b) => b.price - a.price)
                    break
                case "rating":
                    filtered = filtered.sort((a,b) => a.rating - b.rating)
                    break
                case "recent":
                    filtered = filtered.sort((a,b) => a.createdAt - b.createdAt)
                    break
            }
        }

        setResults(filtered)
        

    }


    useEffect(()=>{
        const search = async () =>{
            await fetch(`http://localhost:8000/search/${value}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                mode:'cors'
            }).then(async res=> await res.json()).then(data =>{
                console.log({data})
                setResults(data)
            })
        }

        search()

    },[router.query])

    const toggleModal = () =>{
        setModal(prev => !prev)
    }

    return(<>
    <Head>
        <title>Search: {value}</title>
    </Head>
        <div className={styles.container}>
            <p className={styles.title}>Search result for {value}</p>
            <div className={styles.filtering} onClick={toggleModal}>
                <p>Filter and sort</p>
            </div>
            <div className={styles.new_products}>
                
                {results.length > 0 ? results.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                    )) 
                    :
                    <p>No results</p>
                }

                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                
          </div>
        </div>
        {modal &&
            <Filter toggle={toggleModal} apply={applyFilter}/>
        }
        </>
    )
}