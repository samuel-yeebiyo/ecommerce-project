import {useState, useEffect} from 'react'
import styles from 'styles/profile/orders.module.css'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

import { useRouter } from 'next/router'

export default function OrderWrapper ({order, orders, shop}){

    const [info, setInfo] = useState(false)
    const [total, setTotal] = useState(0)
    const axiosPriv = useAxiosPrivate()
    const [code, setCode] = useState("")
    const [confirmation, setConfirmation] = useState("")

    const router = useRouter()


    const calcTotal = () =>{
        let total = 0
        order.values.map((index)=> {total+=orders[index].total})
        setTotal(total)
    }

    const generateCode = async (id) =>{
        await axiosPriv.post('/shops/generate', {
            order:id
        }).then(res => res.data).then(data =>{
            setCode(data.code)
        })
    }

    const handleConfirmation = async (e) => {
        e.preventDefault()

        await axiosPriv.post('/shops/confirmation', {
            order:order.orderId,
            code:confirmation
        }).then(res => res.data).then(data =>{
            if (data.message == "Success") router.reload()
        })

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
            
            {shop &&  orders[order.values[0]].status == "pending" &&
                <div>
                    <button onClick={()=>{
                        generateCode(order.orderId)
                    }}>Generate shipment code</button>
                    {code ? <p>{code}</p> : <br/>}
                    <form onSubmit={handleConfirmation}>
                        <input type='text' placeholder='Confirmation Code' value={confirmation} onChange={(e)=>setConfirmation(e.target.value)}/>
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            }

            {info ?
                <p onClick={()=>setInfo(false)}>Less info</p> :
                <p onClick={()=>setInfo(true)}>More info</p> 
            }
            {info &&
                <div className={styles.detail}>
                    <p>Items Total: SAMO {total}</p>
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