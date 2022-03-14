import {useState, useEffect} from 'react'

import styles from '../styles/cart.module.css'

export default function Cart({state, toggle, order, removeItem, addItem}) {

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
                  <p>{item.name}</p>
                  <div className={styles.quantity}>
                    <button onClick={()=>{
                      removeItem(item.itemId)
                    }}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={()=>{
                      addItem(item.itemId)
                    }}>+</button>
                  </div>
                  <p>${item.price}</p>
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
