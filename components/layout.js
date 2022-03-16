import Navbar from "./navbar"
import Cart from "./cart"
import styles from '../styles/layout.module.css'

import {useState} from 'react'

export default function Layout({children, toggleNav, order, update, addItem, removeItem, blocking}) {

    const [cartState, setCartState] = useState(false)

    const toggleCart = ()=>{
        setCartState(!cartState);
    }

  return (
      <div className={styles.layout}>
        <Navbar toggleNav={toggleNav} toggle={toggleCart} update={update}/>
        <Cart state={cartState} toggle={toggleCart} order={order} removeItem={removeItem} addItem={addItem} blocking={blocking}/>
        <main>{children}</main>
      </div>
  )
}
