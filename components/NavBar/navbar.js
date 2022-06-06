import styles from './navbar.module.css'
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { userContext } from '@/context/store';
import Cookie from 'cookie-cutter'
import { useUser } from '@/hooks/swrHooks';
import {useWindowSize} from '@/hooks/useWidth'

import {AiOutlineSearch, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineUser, AiOutlineShop} from 'react-icons/ai'

import SearchBar from '@/components/SearchBar/searchBar';

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axiosInstance from '@/lib/api/baseAxios';

import { accessToken } from '@/hooks/useCookies';
import { destroyCookie } from 'nookies';

export default function Navbar({toggle, order, toggleNav, update, userShop}) {
    
    const router = useRouter();
    const {user, setUser} = useContext(userContext)
    const {user_p, mutate, isLoading, error} = useUser()

    const [search, setSearch] = useState(false)
    const [menu, setMenu] = useState(false)

    const axiosPriv = useAxiosPrivate()

    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    const {width, height} = useWindowSize()

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
    
            await axiosInstance.get(`http://search/autocomplete/${searchTerm}`).then(res => res.data).then(suggestions=>{
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
                {/* search button when width is less than 900px */}
                {width < 900 &&
                    <li onClick={()=>{
                        toggleSearch()
                    }}>
                        <AiOutlineSearch className={styles.icon} size={48}/>
                    </li>

                }
                {/*Search area*/}
                <li className={`${styles.search} ${(width<900 && search) ? styles.appear : ""}`}>
                    <SearchBar/>
                </li>
                
                {error || !user_p ? <>
                    {/* if there is no user */}
                    {width < 900 ?
                        // drop down profile menu when there is no user
                        <li>
                            <div className={styles.profile_menu}>
                                <div onClick={()=>{
                                    openMenu()
                                    setSearch(false)
                                    }}>
                                        <AiOutlineUserAdd size={48}/>
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
                        {/* if there is a user */}
                        {width > 900 ?
                            <Link href="/profile">
                                <AiOutlineUser size={48} />
                                </Link>
                        :
                            <div className={styles.profile_menu}>
                                <div onClick={()=>{
                                    setSearch(false)
                                    openMenu()
                                }}>
                                    <AiOutlineUser size={48} />
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
                                        <p onClick={async ()=>{
                                            await axiosPriv.get('/logout')
                                            new Promise((resolve, reject)=>{
                                                destroyCookie(null, 'accessToken', {path: '/'})
                                                destroyCookie(null, 'refreshToken', {path: '/'})

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
                                <AiOutlineShop size={48}/>
                            </Link>:
                            <Link href="/sell/onboarding">
                                Sell
                            </Link>
                        }
                    </li>
                }
                {!error && user_p && width > 900 && <>
                    <li className={styles.signout} onClick={async ()=>{
                        await axiosPriv.get('/logout')
                        new Promise((resolve, reject)=>{
                            destroyCookie(null, 'accessToken', {path: '/'})
                            destroyCookie(null, 'refreshToken', {path: '/'})

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
                    <AiOutlineShoppingCart size={48}/>
                    {order.items.length != 0 &&
                        <div className={styles.cart_status}></div>
                    }
                </li>
            </ul>
        </nav>
    </div>
  )
}
