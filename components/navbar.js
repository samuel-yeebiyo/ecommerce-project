import styles from '../styles/navbar.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Cookie from 'cookie-cutter'

export default function Navbar({toggle, toggleNav, update}) {

    const [user, setUser] = useState(false)
    const router = useRouter();

   useEffect(()=>{
    const value = Cookie.get('userID');
    if(value){
        setUser(true)
    }
    console.log("rendered")
   },[update])

  return (
    <div className={styles.container}>
        <nav className={styles.navigation}>
            <Link href="/">
                <a className={styles.logo}></a>
            </Link>
            <ul>
                <li>
                    <Link href="/">
                    Home
                    </Link>
                </li>
                {!user ? <>
                    <li>
                        <Link href="/signup">
                        Sign up
                        </Link>
                    </li>
                    <li>
                        <Link href="/signin">
                        Sign in
                        </Link>
                    </li> </> : <>
                    <li>
                        <Link href="/profile">
                        Profile
                        </Link>
                    </li>
                    <li className={styles.signout} onClick={()=>{
                    Cookie.set('userID', '', {expires: new Date(0)} )
                    router.reload()
                    // router.replace('/')                 
                    }}>
                        Sign Out
                    </li>
                    </>
                }
                <li className={styles.cart} onClick={()=>{
                    toggle()
                }}><img src="/shoppingcart.svg"></img></li>
            </ul>
        </nav>
    </div>
  )
}
