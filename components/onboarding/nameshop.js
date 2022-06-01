import styles from 'styles/component/nameshop.module.css'
import {useState, useEffect} from 'react'

import { AiOutlineCloseCircle } from 'react-icons/ai' 

import axios from '@/lib/api/baseAxios'

export default function nameshop({confirm, confirmedName, confirmedImage}) {

    const [name, setName] = useState('')
    const [image, setImage] = useState("")

    const [message, setMessage] = useState("")

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }

    const deleteImage=()=>{
        setImage("")
    }

    const checkShopName = async () => {
        const response = await axios.post('/shops/namecheck', {
            name:name
        }).then(res => res.data).then(data=>{
            if(!data.message){
                setMessage("Name taken")
            }else setMessage("")
            
            return data.message
        })

        return response
    }


    useEffect(()=>{
        setName(confirmedName)
        setImage(confirmedImage)
    },[])

  return (
    <div className={styles.main}>
        <p className={styles.add_image}>Add a Shop Image</p>
        <div className={styles.image_input}>
            {image != "" ?
                <div className={styles.preview}>
                    <AiOutlineCloseCircle className={styles.cancel} onClick={deleteImage}/>
                    <img src={URL.createObjectURL(image)}/>
                </div>
                :
                <label className={styles.input_img}>+
                    <input onChange={handleImage} type="file"/>
                </label>
            }
        </div>
        <div className={styles.name}>
            <p className={styles.title}>Name Shop</p>
            <p>Pick a creative name for your shop. Don't worry you can always change it by going to your shop page and selecting the <strong>Manage</strong> tab</p>
            <input className={styles.input} onChange={handleChange} value={name} placeholder="Name" type="text"/>
            {message && <p>{message}</p>}
        </div>
        <button className={styles.button} onClick={async ()=>{
            const bool = await checkShopName(name) 
            console.log(bool)
            if(bool) confirm(name, image)
        }}>Save</button>
    </div>
  )
}
