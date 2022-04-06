import styles from 'styles/profile/review.module.css'

export default function Review ({toggle, item}){
    return(
        <div>
            <span onClick={()=>{
                toggle()
            }}> Hide </span>
            <h2>Review Product</h2>
            <div className={styles.container}>
                <div className={styles.product}>
                    <div className={styles.image}>

                    </div>
                    <div className={styles.rating}>
                        <p>{item.name}</p>
                        <div className={styles.stars}>

                        </div>
                    </div>
                </div>
                <div className={styles.review}>
                    <div>
                        <input placeholder='Title'/>
                        <input placeholder='Name'/>
                    </div>
                    <textarea placeholder='Details'/>
                    <button>Save</button>
                </div>
            </div>
        </div>

    )

}