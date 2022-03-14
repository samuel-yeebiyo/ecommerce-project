import {useState, useEffect} from 'react'

import styles from '../styles/cart.module.css'

export default function Cart({state, toggle, order}) {

    const cartClass = state ? [styles.cart, styles.open].join(" ") : [styles.cart, styles.closed].join(" ")  
    useEffect(()=>{
      
      console.log(order)

    },[order])

  return (
    <div className={cartClass}>
        <div onClick={()=>{toggle()}} className={styles.empty}/>
        <div className={styles.cartContent}>
            {order && order.items.length != 0 ? <>
              {order.items.map((item, idx)=>(
                <div className={styles.item} key={idx}>
                  <p>Name: {item.name}</p>
                  <p>ID: {item.itemId}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
              <p className={styles.total}>Subtotal: {order.subtotal}</p>
              </>
            :
            <p>Cart is empty</p>
            }
        </div>
    </div>
  )
}
