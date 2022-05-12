import styles from 'styles/component/nameshop.module.css'
import {useState, useEffect} from 'react'

export default function nameshop({confirm, confirmedName, confirmedImage}) {

    const [name, setName] = useState('')
    const [image, setImage] = useState("")

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }

    const deleteImage=()=>{
        setImage("")
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
                    <span className={styles.cancel} onClick={deleteImage}/>
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
        </div>
        <button className={styles.button} onClick={()=>{
            confirm(name, image)
        }}>Save</button>
    </div>
  )
}
