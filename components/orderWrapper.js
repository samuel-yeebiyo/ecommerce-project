import {useState, useEffect} from 'react'
import styles from 'styles/profile/orders.module.css'

export default function OrderWrapper ({order, orders}){

    const [info, setInfo] = useState(false)
    const [total, setTotal] = useState(0)

    const calcTotal = () =>{
        let total = 0
        order.values.map((index)=> {total+=orders[index].total})
        setTotal(total)
    }

    useEffect(()=>{
        calcTotal()
    },[])

    return(
        <div className={styles.order_wrapper}>
            <p>{order.orderId}</p>
            
            {order.values.map((index)=>(
            <div className={styles.order}>
                <div className={styles.order_images}>
                <div className={styles.img_container}>
                    <img src={orders[index].productImage}/>
                </div>
                </div>
                <div className={styles.order_details}>
                <p>Order Id: {orders[index]._id}</p>
                <strong>{orders[index].productName}</strong>
                <p>X {orders[index].quantity}</p>
                <strong>SAMO {orders[index].total}</strong>
                <p>Status: {orders[index].status}</p>
                </div>
            </div>
            ))}

            {info ?
                <p onClick={()=>setInfo(false)}>Less info</p> :
                <p onClick={()=>setInfo(true)}>More info</p> 
            }
            {info &&
                <div className={styles.detail}>
                    <p>Items Total: SAMO {total}</p>
                    <p>Payment confirmation:</p>
                    <div>
                        <strong>Addressed To</strong>
                        <p>{orders[order.values[0]].address.first_name}</p>
                        <p>{orders[order.values[0]].address.last_name}</p>
                        <p>{orders[order.values[0]].address.country}</p>
                        <p>{orders[order.values[0]].address.city}</p>
                        <p>{orders[order.values[0]].address.street}</p>
                        <p>{orders[order.values[0]].address.phone_number}</p>
                        <p>{orders[order.values[0]].address.postal}</p>
                    </div>
                </div>
            }

        </div>
    )
}