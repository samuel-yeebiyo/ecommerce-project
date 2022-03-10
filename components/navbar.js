import styles from '../styles/navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({toggle}) {


  return (
    <div className={styles.container}>
        <nav className={styles.navigation}>
            <ul>
            <li>
                <Link href="/">
                Home
                </Link>
            </li>
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
            <li>
                <Link href="/profile">
                Profile
                </Link>
            </li>
            <button onClick={()=>{
                toggle()
            }}>Cart</button>
            </ul>
        </nav>
    </div>
  )
}
