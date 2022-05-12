import styles from 'styles/component/navbar.module.css'
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { userContext } from '@/context/store';
import Cookie from 'cookie-cutter'
import { useUser } from '@/hooks/swrHooks';
import {useWindowSize} from '@/hooks/useWidth'

export default function Navbar({toggle, order, toggleNav, update, userShop}) {
    
    const router = useRouter();
    const {user, setUser} = useContext(userContext)
    const {user_p, mutate, isLoading, error} = useUser()

    const [search, setSearch] = useState(false)
    const [menu, setMenu] = useState(false)


    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    const {width, height} = useWindowSize()

    console.log({user_p})
    const toggleSearch = ()=> setSearch(prev => !prev)
    
    const openMenu = ()=> {
        setMenu(true)
    }
    const closeMenu = ()=> {
        const body = document.querySelector("body")
        body.removeEventListener('click', closeMenu)
        setMenu(false)
    }

    useEffect(()=>{
    
        const fetchSuggestions = async () =>{
    
            console.log("Searching")
    
            await fetch(`http://localhost:8000/search/${searchTerm}`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                mode:'cors',
            }).then(async res => await res.json()).then(suggestions=>{
                console.log({suggestions})
                setResults(suggestions)
            })
        }
    
        searchTerm.length > 1 && fetchSuggestions()
    
    },[searchTerm])
    
    useEffect(()=>{
        if(menu){
            const body = document.querySelector("body")
            body.addEventListener('click', closeMenu)
        }


    },[menu])


  return (
    <div className={`${styles.container} ${(width<900 && search) ? styles.extend : ""}`}>
        <nav className={styles.navigation}>
            <Link href="/">
                <a className={styles.logo}></a>
            </Link>
            <ul>
                {width < 900 &&
                    <li onClick={()=>{
                        toggleSearch()
                    }}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55Z"/></svg>
                    </li>

                }
                {/*Search area*/}
                <li className={`${styles.search} ${(width<900 && search) ? styles.appear : ""}`}>
                    <div className={styles.terms}>
                        <input placeholder='Search' value={searchTerm} onChange={(e)=>{
                            setSearchTerm(e.target.value)
                            setShowResults(true)
                            }}/>
                        {searchTerm.length > 2 && showResults && <>
                            {results.length > 0 ? results.map((item)=>(
                                <p className={styles.recommendations}>{item.name}</p>
                            ))
                                :
                                <p>No matching results</p>
                            }

                        </>
                        }
                    </div>
                    <button onClick={()=>{
                        if(searchTerm.length > 0){
                            router.push({pathname:'/search', query:{value:searchTerm}})
                            setShowTerms(false)
                        }
                        }}>Search</button>
                </li>
                
                {error ? <>
                    {width < 900 ? 
                        <li>
                            <div className={styles.profile_menu}>
                                <div onClick={()=>{
                                    openMenu()
                                    setSearch(false)
                                    }}>
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M36.5 28V21.5H30V18.5H36.5V12H39.5V18.5H46V21.5H39.5V28ZM18 23.95Q14.7 23.95 12.6 21.85Q10.5 19.75 10.5 16.45Q10.5 13.15 12.6 11.05Q14.7 8.95 18 8.95Q21.3 8.95 23.4 11.05Q25.5 13.15 25.5 16.45Q25.5 19.75 23.4 21.85Q21.3 23.95 18 23.95ZM2 40V35.3Q2 33.55 2.9 32.125Q3.8 30.7 5.4 30Q9.15 28.35 12.075 27.675Q15 27 18 27Q21 27 23.925 27.675Q26.85 28.35 30.55 30Q32.15 30.75 33.075 32.15Q34 33.55 34 35.3V40ZM5 37H31V35.3Q31 34.5 30.6 33.775Q30.2 33.05 29.35 32.7Q25.85 31 23.375 30.5Q20.9 30 18 30Q15.1 30 12.625 30.525Q10.15 31.05 6.6 32.7Q5.85 33.05 5.425 33.775Q5 34.5 5 35.3ZM18 20.95Q19.95 20.95 21.225 19.675Q22.5 18.4 22.5 16.45Q22.5 14.5 21.225 13.225Q19.95 11.95 18 11.95Q16.05 11.95 14.775 13.225Q13.5 14.5 13.5 16.45Q13.5 18.4 14.775 19.675Q16.05 20.95 18 20.95ZM18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45Q18 16.45 18 16.45ZM18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Q18 30 18 30Z"/></svg>
                                </div>
                                {menu &&
                                    <div className={styles.menu}>
                                        <Link href="/signin">
                                            <p>Sign In</p>
                                        </Link>
                                        <Link href="/signup">
                                            <p>Sign Up</p>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </li>
                    :<>
                        <li>
                            <Link href="/signup">
                            Sign up
                            </Link>
                        </li>
                        <li>
                            <Link href="/signin">
                            Sign in
                            </Link>
                        </li>
                    </>
                    }
                     </> : <>
                    <li>
                        {width > 900 ?
                            <Link href="/profile">
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z"/></svg>
                            </Link>
                        :
                            <div className={styles.profile_menu}>
                                <div onClick={()=>{
                                    setSearch(false)
                                    openMenu()
                                }}>
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z"/></svg>
                                </div>
                                {menu &&
                                    <div className={styles.menu}>
                                        <Link href="/profile/">
                                            <p>Account</p>
                                        </Link>
                                        <Link href="/profile/orders">
                                            <p>Orders</p>
                                        </Link>
                                        <Link href="/profile/reviews">
                                            <p>Reviews</p>
                                        </Link>
                                        <Link href="/profile/saved">
                                            <p>Saved</p>
                                        </Link>
                                        <p onClick={()=>{
                                            new Promise((resolve, reject)=>{
                                                Cookie.set('accessToken', '', {expires: new Date(0)})
                                                Cookie.set('refreshToken', '', {expires: new Date(0)})

                                                resolve()
                                            }).then(()=>{
                                                window.location.replace("/")
                                            })
                                        }}>
                                            Sign Out
                                        </p>

                                    </div>
                                }
                            </div>
                        }
                    </li>
                    </>
                }
                { !error && user_p && router.asPath != '/sell/onboarding' &&
                    <li>
                        {user_p.shopId != "" ?
                            <Link href="/myshop/overview">
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M8 11V8H40.1V11ZM8.25 40V27.1H5.8V24.1L8 14H40.05L42.25 24.1V27.1H39.8V40H36.8V27.1H27.35V40ZM11.25 37H24.35V27.1H11.25ZM8.75 24.1H39.3ZM8.75 24.1H39.3L37.75 17H10.3Z"/></svg>
                            </Link>:
                            <Link href="/sell/onboarding">
                                Sell
                            </Link>
                        }
                    </li>
                }
                {!error && width > 900 && <>
                    <li className={styles.signout} onClick={()=>{
                        new Promise((resolve, reject)=>{
                            Cookie.set('accessToken', '', {expires: new Date(0)})
                            Cookie.set('refreshToken', '', {expires: new Date(0)})

                            resolve()
                        }).then(()=>{
                            window.location.replace("/")
                        })
                    }}>
                        Sign Out
                    </li>
                    </>
                }
                <li className={styles.cart} onClick={()=>{
                    toggle()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    {order.items.length != 0 &&
                        <div className={styles.cart_status}></div>
                    }
                </li>
            </ul>
        </nav>
    </div>
  )
}
