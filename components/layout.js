import Navbar from "./navbar"
import Cart from "./cart"
import styles from '../styles/layout.module.css'

import {useState} from 'react'

export default function Layout({children, counter, update}) {

    const [cartState, setCartState] = useState(false)

    const toggleCart = ()=>{
        setCartState(!cartState);
    }

  return (
      <div className={styles.layout}>
        <Navbar toggle={toggleCart} update={update}/>
        <Cart state={cartState} toggle={toggleCart} counter={counter}/>
        <main>{children}</main>
      </div>
  )
}
