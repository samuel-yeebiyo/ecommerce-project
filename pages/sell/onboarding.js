import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

import NameShop from '../../components/onboarding/nameshop'
import Payment from '../../components/onboarding/payment'

import styles from '../../styles/onboarding.module.css'
import CreateListing from '../../components/createlisting'

export default function onboarding(){

    const [progress, setProgress] = useState({
        name:false,
        pubKey:false,
        listing:false
    })
    
    const[current, setCurrent] = useState('name')

    const [name, setName] = useState('')
    const [pubKey, setPubKey] = useState('')
    const [listing, setListing] = useState('')

    const router = useRouter()

    const confirmName = (name)=>{
        setName(name)
        if (!progress.name){
            setProgress(prev => ({...prev, name:true}))
        }
        if(progress.pubKey){
            setCurrent('listing')
        }else setCurrent('pubkey')
    }

    const confirmPubKey = (key)=>{
        setPubKey(key)
        if (!progress.key){
            setProgress(prev => ({...prev, pubKey:true}))
        }
        setCurrent('listing')
    }

    useEffect(()=>{
        //check is 
        if(progress == ''){
            router.push('/seller', undefined, {shallow: true})
        }
    },[])

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.side_choice}>
                    <div onClick={()=>{
                        if(progress.name){
                            setCurrent('name')
                        }
                    }}>
                        <p>Name</p>
                    </div>
                    <div onClick={()=>{
                        if(progress.pubKey || progress.name){
                            setCurrent('pubkey')
                        }
                    }}>
                        <p>Billing</p>
                    </div>
                    <div onClick={()=>{
                        if(progress.pubKey){
                            setCurrent('listing')
                        }
                    }}>
                        <p>Create Listing</p>
                    </div>
                </div>
                <div className={styles.main_board}>
                    {current == 'name' &&
                        <NameShop confirm={confirmName} confirmedName={name}/>
                    }
                    {current == 'pubkey' &&
                        <Payment confirm={confirmPubKey} confirmedKey={pubKey}/>
                    }
                    {current == 'listing' &&
                        <CreateListing/>
                    }
                </div>
            </div>
        </div>
    )
}