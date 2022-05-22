import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import styles from 'styles/base/stats.module.css'
import LineChart from '@/components/Chart/LineChart'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function stats(){

    const router = useRouter()

    const [view, setView] = useState("daily")
    const [chartData, setChartData] = useState([0,0,0,0,0,0,0])
    const [dailyData, setDailyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [tableData, setTableData] = useState([])

    const axiosPriv = useAxiosPrivate()

    const fetchShopStats = async () =>{

        axiosPriv.get('/shops/stats').then(res => res.data)
        .then(data=>{

            console.log({data})

            setChartData([...data.daily])
            setDailyData([...data.daily])
            setMonthlyData([...data.monthly])
        })


    }

    const fetchProductStats = async () =>{

        axiosPriv.get('/shops/stats/products').then(res => res.data)
        .then(data=>{

            console.log({data})
            setTableData([...data])
        })

    }

    useEffect(()=>{
        
        fetchShopStats()
        fetchProductStats()

        
    },[])

    return(
        <section className={styles.overview_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main >
               <p className={styles.heading}>Shop Stats</p>
               <div>
                   <select onChange={(e)=>{
                       setView(e.target.value)
                       if(e.target.value =="daily"){
                        setChartData(dailyData)
                       }else{
                        setChartData(monthlyData)
                       }
                    }}>
                       <option value="daily" >Days</option>
                       <option value="monthly" >Months</option>
                   </select>
               </div>
               <div className={styles.graph}>
                   <LineChart view={view} data={chartData}/>
               </div>
               <p className={styles.heading}>Listings</p>
               <div>
                   <table className={styles.product_table}>
                       <tr>
                           <th>Name</th>
                           <th>Category</th>
                           <th>Rating</th>
                           <th>Revenue</th>
                           <th>Sold</th>
                           <th>Views</th>
                           <th>Created</th>
                       </tr>
                       {tableData.map((product)=>(
                           <tr>
                               <td>{product.name}</td>
                               <td>{product.category}</td>
                               <td>{product.rating}</td>
                               <td>{product.revenue}</td>
                               <td>{product.revenue/product.price}</td>
                               <td>{product.views}</td>
                               <td>{new Date(product.createdAt).toDateString()}</td>
                           </tr>
                       ))

                       }
                   </table>
               </div>
            </main>
        </section>
    )
}

stats.Layout = ShopAdmin