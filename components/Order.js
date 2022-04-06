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
                            {item.name}
                            {item.quantity}
                            {item.price}
                        </div>
                    ))

                    }
                </div>
                <div className={styles.overview}>
                    <p>Overview</p>
                    <div className={styles.detail}>
                        <p>Items Total: {order.subtotal}</p>
                        <p>Payment confirmation:</p>
                    </div>
                </div>
            </div>
        </div>

    )

}