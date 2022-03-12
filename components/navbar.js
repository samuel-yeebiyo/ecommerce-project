import styles from '../styles/navbar.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Cookie from 'cookie-cutter'

export default function Navbar({toggle, update}) {

    const [user, setUser] = useState(false)

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
                </li> </> :
                <li>
                    <Link href="/profile">
                    Profile
                    </Link>
                </li>
            }
            <button onClick={()=>{
                toggle()
            }}>Cart</button>
            </ul>
        </nav>
    </div>
  )
}
