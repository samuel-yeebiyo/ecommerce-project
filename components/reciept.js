import styles from '../styles/reciept.module.css'

const Reciept = ({reciept, clear})=>{
    return(
        <div className={styles.reciept}>
            <div className={styles.center_container}>
                <img src="/done.png"/>
                <p>Thank you for your purchase!</p>
            </div>
            <div className={styles.reciept_details}>
                <p><span>Tx Signature:</span> {reciept.confirmation}</p>
                <p><span>Link:</span> <a target="_blank" href={`https://solscan.io/tx/${reciept.confirmation}`}>{`https://solscan.io/tx/${reciept.confirmation}`}</a></p>
                <p><span>Date:</span> {reciept.date}</p>
            </div>
            <button onClick={()=>{
                window.location.replace('/')
            }} className={styles.continue}>Continue</button>
        </div>
    )
}

export default Reciept