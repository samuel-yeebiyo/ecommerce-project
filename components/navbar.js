import styles from 'styles/component/navbar.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Cookie from 'cookie-cutter'

export default function Navbar({toggle, order, toggleNav, update, userShop}) {

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
                <li>
                    <Link href="/store">
                    Store
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
                    </>
                }
                { user && router.asPath != '/sell/onboarding' &&
                    <li>
                        {userShop ?
                            <Link href="/myshop/overview">
                                My Shop
                            </Link>:
                            <Link href="/sell/onboarding">
                                Sell
                            </Link>
                        }
                    </li>
                }
                {user && <>
                    <li className={styles.signout} onClick={()=>{
                        Cookie.set('userID', '', {expires: new Date(0)} )
                        window.location.replace("/")
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
