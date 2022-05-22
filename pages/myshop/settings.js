import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/settings.module.css'
import axios from 'axios'
import nookies from 'nookies'
import Cookie from 'cookie-cutter'
import { useRouter } from 'next/router'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function myshop({user, blocking, cookies}){

    const [image, setImage]= useState("")
    const [uploadable, setUploadable] = useState("")
    const [name, setName] = useState("")
    const [pubkey, setPubkey] = useState("")
    const [description, setDescription] = useState("")

    const axiosPriv = useAxiosPrivate()

    const router = useRouter()

    useEffect(()=>{

        const fetchShopInfo = async () =>{

            await axiosPriv.get('/user/get-shop-meta').then(res=> res.data)
            .then(data=>{
                console.log(data)
                setImage(data.image)
                setName(data.name)
                setPubkey(data.pubkey)
                setDescription(data.description)
            })

            // fetch(`http://localhost:8000/user/get-shop-meta`, {
            //     method:'GET',
            //     headers:{
            //         'Content-Type':'appllication/json',
            //         'Access-Control-Allow-Origin':'*',
            //         'authorization': `Bearer ${accessToken}`
            //     },
            //     mode:'cors',
            // }).then(async res=> await res.json()).then(data=>{
            //     console.log(data)
            //     setImage(data.image)
            //     setName(data.name)
            //     setPubkey(data.pubkey)
            //     setDescription(data.description)
            // })
        }
        

        fetchShopInfo()

    },[])

    const clearImage = () => setImage("")


    const uploadPrimary = async()=>{

        const formData = new FormData()

        if(image.split(":")[0] == "blob"){
            formData.append('file', uploadable)
            formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

            await axios.post('https://api.cloudinary.com/v1_1/vernon2021/image/upload', formData).then(async res => {
                console.log(res)
                const url = res.data.secure_url
                setImage(url)
            })
        }
    }

    const handleSave = async () =>{

        await uploadPrimary()

        await axiosPriv.post('/shops/update', {
            name:name,
            pubKey:pubkey,
            description:description,
            image:image
        }).then( res=> res.data).then(data=>{
            if(data.message == "Success"){
                router.replace('/myshop/overview')
            }
        })

        // await fetch(`http://localhost:8000/shops/update/`, {
        //     method:"POST",
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin':'*',
        //         'authorization':`Bearer ${accessToken}`
        //     },
        //     mode:'cors',
        //     body:JSON.stringify({
        //         name:name,
        //         pubKey:pubkey,
        //         description:description,
        //         image:image
        //     })
        // }).then(async res=>await res.json()).then(data=>{
        //     if(data.message == "Success"){
        //         router.replace('/myshop/overview')
        //     }
        // })
    }

    return(
        <div className={styles.overview_container}>
            <Head>
                <title>My Shop</title>
            </Head>
            <main>
                <p className={styles.title}>Manage Shop</p>
                <div className={styles.content}>
                    <p>Shop Image</p>
                    <form className={styles.setting_form}>
                        {image ?
                            <div className={styles.image}>
                                <div className={styles.delete} onClick={clearImage}/>
                                <img src={image}/>
                            </div> :  
                            <label className={styles.input_button}> +
                                <input className={styles.image_input} type="file" onChange={(e)=>{ 
                                    const image = URL.createObjectURL(e.target.files[0])
                                    console.log(image)
                                    setUploadable(e.target.files[0])
                                    setImage(image)
                                }}/>
                            </label>
                        }
                            
                        <label>Shop Name</label>
                        <input placeholder='Name' type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <label>Public Key</label>
                        <input placeholder='ID' type='text' value={pubkey} onChange={(e)=>setPubkey(e.target.value)}/>
                        <label>Shop Description</label>
                        <textarea placeholder='Description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        <button type="button" onClick={handleSave}>Save</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

myshop.Layout = ShopAdmin

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