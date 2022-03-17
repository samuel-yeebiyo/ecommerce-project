import {useState, useEffect} from 'react'
import Link from 'next/link'

import styles from '../styles/cart.module.css'

export default function Cart({state, toggle, order, removeItem, addItem, blocking}) {

    const cartClass = state ? [styles.cart, styles.open].join(" ") : [styles.cart, styles.closed].join(" ")  
    useEffect(()=>{
      
      console.log(order)

    },[order])

  return (
    <div className={cartClass}>
        <div onClick={()=>{toggle()}} className={styles.empty}/>
        <div className={styles.cartContent}>
          <div className={styles.cart_top}>
            <p>Your Cart</p>
            <div className={styles.close_button} onClick={()=>{toggle()}}>X</div>
          </div>
            {order && order.items.length != 0 ? <>
              {order.items.map((item, idx)=>(
                <div className={styles.item} key={idx}>
                  <p>{item.name}</p>
                  <div className={blocking ? styles.blocking : styles.quantity}>
                    <button onClick={()=>{
                      if(!blocking){
                        removeItem(item.itemId)
                      }

                    }}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={()=>{
                      
                      if(!blocking){
                        addItem(item.itemId)
                      }
                    
                    }}>+</button>
                  </div>
                  <p>${item.price}</p>
                </div>
              ))}
              <div className={styles.subtotal}>
                <p>Subtotal</p>
                <p className={styles.total}>${order.subtotal}</p>
              </div>
              <div className={styles.checkout}>
                <Link href="/checkout">
                  <a className={styles.checkout_link}><button className={styles.checkout_button} onClick={()=>{
                    toggle()
                  }}>Checkout
                  </button></a>
                </Link>
                <p>Tax and shipping not included.</p>
              </div>
              </>
            :
            <div className={styles.empty_state}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              <p>Your shopping cart is empty!</p> 
            </div>
            }
        </div>
    </div>
  )
}
