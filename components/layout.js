import Navbar from "./navbar"
import Cart from "./cart"
import styles from '../styles/layout.module.css'

import {useState} from 'react'

export default function Layout({children, counter}) {

    const [cartState, setCartState] = useState(false)

    const toggleCart = ()=>{
        setCartState(!cartState);
    }

  return (
      <div className={styles.layout}>
        <Navbar toggle={toggleCart}/>
        <Cart state={cartState} toggle={toggleCart} counter={counter}/>
        <main>{children}</main>
      </div>
  )
}
