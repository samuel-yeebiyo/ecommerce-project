import {useState} from 'react'

import styles from '../styles/cart.module.css'

export default function Cart({state, toggle, counter}) {

    const cartClass = state ? [styles.cart, styles.open].join(" ") : [styles.cart, styles.closed].join(" ")  


  return (
    <div className={cartClass}>
        <div onClick={()=>{toggle()}} className={styles.empty}></div>
        <div className={styles.cartContent}>
            Counter: {counter}
        </div>
    </div>
  )
}
