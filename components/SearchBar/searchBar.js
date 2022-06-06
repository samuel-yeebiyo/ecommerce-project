import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './searchBar.module.css'
import axiosInstance from '@/lib/api/baseAxios'

export default function SearchBar () {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    useEffect(()=>{
    
        const fetchSuggestions = async () =>{
    
            console.log("Searching")
    
            await axiosInstance.get(`http://localhost:8000/search/autocomplete/${searchTerm}`).then(res => res.data).then(suggestions=>{
                console.log({suggestions})
                setResults(suggestions)
            })
        }
    
        searchTerm.length > 1 && fetchSuggestions()
    
    },[searchTerm])

    return (<>
        <div className={styles.terms}>
            <input className={styles.search_input} placeholder='Search' value={searchTerm} onChange={(e)=>{
                setSearchTerm(e.target.value)
                setShowResults(true)
                }}/>
            {searchTerm.length > 2 && showResults && <>
                {results.length > 0 && results.map((item)=>(
                    <p className={styles.recommendations}>{item.name}</p>
                ))
                }

            </>
            }
        </div>
        <button className={styles.search_button} onClick={()=>{
            if(searchTerm.length > 0){
                router.push({pathname:'/search', query:{value:searchTerm}})
                setShowResults(false)
            }
            }}>Search</button>
    </>)

}