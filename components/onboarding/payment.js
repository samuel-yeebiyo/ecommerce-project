import {useState, useEffect} from 'react'
import styles from '../../styles/component/payment.module.css'

export default function Payment({confirm, confirmedKey}){

    const [key, setKey] = useState('')
    const [confirmation, setConfirmation] = useState('')

    const [message, setMessage] = useState("")

    const handleKey=(e)=>{
        setKey(e.target.value)
    }
   
    const handleConfirmation = (e)=>{
        setConfirmation(e.target.value)
    }
   
    const checkConfirmation = () => {
        if(key == confirmation){
            confirm(key)
        }else{
            setMessage("Please make sure that the two fields are the same")
        }
    }

    useEffect(()=>{
        setKey(confirmedKey)
    },[])



    return(
        <div className={styles.main}>
            <p className={styles.title}> Enter your public key</p>
            <p>Please enter the public address of your solana wallet. Make sure you enter the correct address since all sales revenue will be sent here</p>
            <input className={styles.input} onChange={handleKey} placeholder="Public Key" value={key} type='text'/>
            <input className={styles.input} onChange={handleConfirmation} placeholder="Confirm public Key" value={confirmation} type='text'/>
            <button className={styles.button} onClick={()=>{
                checkConfirmation()
            }}>Confirm and Create Shop</button>
            {message && <p>{message}</p>}
        </div>
    )
}