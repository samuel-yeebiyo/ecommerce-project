import Head from 'next/head'
import Filter from '@/components/modals/filter'
import styles from '../styles/base/search.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Search(){

    const router = useRouter()
    const {value} = router.query

    const [modal, setModal] = useState()

    useEffect(()=>{
        const search = () =>{

        }

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
                {/* {allProducts?.map((product, idx)=>(
                    <ProductCard key={idx} product={product}/>
                    ))
                } */}
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
                <div className={styles.product}></div>
          </div>
        </div>
        {modal &&
            <Filter toggle={toggleModal}/>
        }
        </>
    )
}