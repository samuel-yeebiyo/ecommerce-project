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
                    <div className={styles.item}>
                    </div>
                    <div className={styles.item}>
                    </div>
                </div>
                <div className={styles.overview}>
                    <p>Overview</p>
                    <div className={styles.detail}>
                        <p>Items Total:</p>
                        <p>Payment confirmation:</p>
                    </div>
                </div>
            </div>
        </div>

    )

}