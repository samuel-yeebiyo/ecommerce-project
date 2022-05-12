import {useState, useEffect} from 'react'
import styles from '../../styles/component/payment.module.css'

export default function Payment({confirm, confirmedKey}){

    const [key, setKey] = useState('')

    const handleChange=(e)=>{
        setKey(e.target.value)
    }

    useEffect(()=>{
        setKey(confirmedKey)
    },[])



    return(
        <div className={styles.main}>
            <p className={styles.title}> Enter your public key</p>
            <p>Please enter the public address of your solana wallet. Make sure you enter the correct address since all sales revenue will be sent here</p>
            <input className={styles.input} onChange={handleChange} placeholder="Public Key" value={key} type='text'/>
            <input className={styles.input} onChange={handleChange} placeholder="Confirm public Key" value={key} type='text'/>
            <button className={styles.button} onClick={()=>{
                confirm(key)
            }}>Confirm and Create Shop</button>
        </div>
    )
}