import Head from 'next/head'
import Filter from '@/components/modals/filter'
import styles from '../styles/base/search.module.css'
import ProductCard from '@/components/productCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/baseAxios'

import {MdYoutubeSearchedFor} from 'react-icons/md'

export default function Search(){

    const router = useRouter()
    const {value} = router.query

    const [modal, setModal] = useState()

    const [results, setResults] = useState([])
    const [filtered, setFiltered] = useState([])

    const [searching, setSearching] = useState(false)


    const applyFilter = (min, max, category, sortby) =>{

        let filtered = [...results]

        //filter price
        if(min>0 || max>0){
            filtered = filtered.filter(item => item.price >= min)
            filtered = filtered.filter(item => item.price <= max)
            console.log("Price")
            console.log({filtered})
        }

        //filter category
        if(category != "" && category != "-- Category"){
            filtered = filtered.filter(item => item.category == category)
            console.log("Cat")
            console.log({filtered})
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
                    filtered = filtered.sort((a,b) => b.rating - a.rating)
                    break
                case "recent":
                    filtered = filtered.sort((a,b) => a.createdAt - b.createdAt)
                    break
            }
            console.log("sort")
            console.log({filtered})
        }

        setFiltered(filtered)
        

    }


    useEffect(()=>{
        const search = async () =>{
            setFiltered([])
            setSearching(true)

            await axiosInstance.get(`/search/${value}`).then(res => res.data).then(data =>{
                console.log({data})
                setResults(data)
                setFiltered(data)
                setSearching(false)
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
            <p className={styles.title}>Search result for "{value}"</p>
            <div className={styles.filtering} onClick={toggleModal}>
                <p>Filter and sort</p>
            </div>
            <div className={styles.new_products}>
                
                {filtered.length > 0 && filtered.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                    )) 
                    
                }
                
          </div>
          {searching && 
            <div className={styles.searching}>
                <p>Searching...</p>
            </div>
          }
          {!searching && !filtered.length > 0 &&
            <div className={styles.error}>
                <MdYoutubeSearchedFor size={90}/>    
                <p>No matching results found</p>
            </div>
          }
        </div>
        {modal &&
            <Filter toggle={toggleModal} apply={applyFilter}/>
        }
        </>
    )
}