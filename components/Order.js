import styles from 'styles/profile/order.module.css'

export default function Order ({toggle, order}){
    return(
        <div>
            <span onClick={()=>{
                toggle()
            }}> Hide </span>
            <h2>Order</h2>
            <div className={styles.container}>
                <div className={styles.items}>
                    <p>Items</p>
                    {order.items.map((item)=>(
                        <div className={styles.item}>
                            <div className={styles.image}>
                                <img src={item.product.primary}/>
                            </div>
                            <div>
                                <p className={styles.name}>{item.product.name}</p>
                                <p className={styles.quantity}>X{item.quantity}</p>
                                <p className={styles.price}>{item.product.price} SAMO</p>
                            </div>
                        </div>
                    ))

                    }
                </div>
                <div className={styles.overview}>
                    <p>Overview</p>
                    <div className={styles.detail}>
                        <p>Items Total: SAMO {order.subtotal}</p>
                        <p>Payment confirmation:</p>
                        <div>
                            <strong>Addressed To</strong>
                            <p>{order.address.first_name}</p>
                            <p>{order.address.last_name}</p>
                            <p>{order.address.country}</p>
                            <p>{order.address.city}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.phone_number}</p>
                            <p>{order.address.postal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}