import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

import NameShop from "@/components/onboarding/nameshop"
import Payment from '@/components/onboarding/payment'

import styles from 'styles/base/onboarding.module.css'
import CreateListing from '@/components/createlisting'

import Cookie from 'cookie-cutter'

export default function onboarding({toggleLoading}){

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

    const createShop = async ()=>{
        let user = Cookie.get('userID')
        let shop
        await fetch('http://localhost:8000/register/seller', {
            method:'POST',
            headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            mode:'cors',
            body:JSON.stringify({
                id:user,
                name:name,
                pubkey:pubKey
            })
        }).then(async res => await res.json()).then(async data =>{
            shop = data.id
        })

        console.log({shop})
        return shop
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
                    <div className={current == 'name'? [styles.name, styles.current].join(" ") : styles.name} onClick={()=>{
                        if(progress.name){
                            setCurrent('name')
                        }
                    }}>
                        <p>Name</p>
                    </div>
                    <div className={current == 'pubkey' && styles.current} onClick={()=>{
                        if(progress.pubKey || progress.name){
                            setCurrent('pubkey')
                        }
                    }}>
                        <p>Billing</p>
                    </div>
                    <div  className={current == 'listing'? [styles.listing, styles.current].join(" ") : styles.listing} onClick={()=>{
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
                        <CreateListing shop={createShop} loading={toggleLoading}/>
                    }
                </div>
            </div>
        </div>
    )
}