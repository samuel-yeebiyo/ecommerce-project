import {useState, useEffect} from 'react'

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
                <button className={styles.checkout_button} onClick={()=>{
                }}>Checkout
                </button>
                <p>Tax and shipping not included.</p>
              </div>
              </>
            :
            <p>Cart is empty</p>
            }
        </div>
    </div>
  )
}
