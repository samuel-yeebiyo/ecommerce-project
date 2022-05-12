import {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { userContext } from '@/context/store'

import NameShop from "@/components/onboarding/nameshop"
import Description from '@/components/onboarding/description'
import Payment from '@/components/onboarding/payment'

import styles from 'styles/base/onboarding.module.css'
import CreateListing from '@/components/createlisting'
import PostListing from '@/components/modals/postListing'

import axios from 'axios'
import nookies from 'nookies'
import { setCookie, destroyCookie } from 'nookies'
import Cookie from 'cookie-cutter'

export default function onboarding({cookies}){

    const [progress, setProgress] = useState({
        name:false,
        pubKey:false,
        listing:false,
        description:false,
        image:false
    })
    
    const[current, setCurrent] = useState('name')

    const [name, setName] = useState('')
    const [image, setImage] = useState("")
    const [pubKey, setPubKey] = useState('')
    const [description, setDescription] = useState('')

    const [modal, setModal] = useState(false)

    const {setLoading} = useContext(userContext)
    

    const router = useRouter()

    const confirmName = (name, image)=>{
        setName(name)
        if (!progress.name){
            setProgress(prev => ({...prev, name:true}))
            setImage(image)
        }
        if(progress.pubKey){
            setCurrent('listing')
        }else setCurrent('description')
    }

    const confirmDescription = (desc) =>{
        setDescription(desc)
        if (!progress.description){
            setProgress(prev => ({...prev, description:true}))
        }
        setCurrent('pubkey')
    }

    const confirmPubKey = (key)=>{
        setPubKey(key)
        if (!progress.key){
            setProgress(prev => ({...prev, pubKey:true}))
        }
        createShop(key)
    }


    const createShop = async (key)=>{
        
        setLoading(true)
        let shop
        const formData = new FormData()
        let imageurl
        if(image != ""){
            formData.append('file', image)
            formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

            await axios.post('https://api.cloudinary.com/v1_1/vernon2021/image/upload', formData).then(async res => {
                console.log(res)
                const url = res.data.secure_url
                imageurl = url
            })
        }

        const {accessToken} = cookies

        await fetch('http://localhost:8000/register/seller', {
            method:'POST',
            headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': `Bearer ${accessToken}`
            },
            mode:'cors',
            body:JSON.stringify({
                name:name,
                description:description,
                pubkey:key,
                image:imageurl,
                pathname:name.toLowerCase().replaceAll(" ","-")
            })
        }).then(async res => await res.json()).then(async data =>{
            
            setLoading(false)

            shop = data.id

            destroyCookie(null, 'accessToken')
            destroyCookie(null, 'refreshToken')

            setCookie(null, 'accessToken', data.accessToken, {
                path:'/'
            })
            setCookie(null, 'refreshToken', data.refreshToken, {
                path:'/'
            })

            toggleModal()

        })

        console.log({shop})
        return shop
    }


    //toggle modal
    const toggleModal=()=>{
        setModal(prev => !prev)
    }


    useEffect(()=>{
        //check is 
        if(progress == ''){
            router.push('/seller', undefined, {shallow: true})
        }
    },[])

    return(<>
    <Head>
        <title>Welcome | Onboarding</title>
    </Head>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.side_choice}>
                    <div className={current == 'name'? styles.current : styles.choice} onClick={()=>{
                        if(progress.name){
                            setCurrent('name')
                        }
                    }}>
                        <p className={styles.text}>Name</p>
                    </div>
                    <div  className={current == 'description' && styles.current} onClick={()=>{
                        if(progress.description || progress.name){
                            setCurrent('description')
                        }
                    }}>
                        <p className={styles.text}>Description</p>
                    </div>
                    <div className={current == 'pubkey' && styles.current} onClick={()=>{
                        if(progress.description){
                            setCurrent('pubkey')
                        }
                    }}>
                        <p className={styles.text}>Billing</p>
                    </div>
                </div>
                <div className={styles.main_board}>
                    {current == 'name' &&
                        <NameShop confirm={confirmName} confirmedName={name} confirmedImage={image}/>
                    }
                    {current == 'description' && 
                        <Description confirm={confirmDescription} confirmedDescription={description}/>
                    }
                    {current == 'pubkey' &&
                        <Payment confirm={confirmPubKey} confirmedKey={pubKey}/>
                    }
                </div>
            </div>
        </div>
        {modal &&
            <PostListing toggle={toggleModal}/>
        }
    </>
    )
}

export async function getServerSideProps(context){
    
    const cookies = nookies.get(context)
    
    console.log({cookies})
    
    if(!cookies.accessToken) {
        return {
            redirect:{
          permanent:false,
          destination:'/signin'
        }
      }
    }
  
    return{
      props:{
        cookies
      }
    }
}