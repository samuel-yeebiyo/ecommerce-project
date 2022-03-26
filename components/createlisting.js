import styles from '../styles/listing.module.css'
import {useState, useEffect} from 'react'

import axios from 'axios'

export default function CreateListing () {

    const [primary, setPrimary] = useState({
        image:"",
        url:""
    })
    const [secondary, setSecondary] = useState([])

    const handlePrimary = (event)=>{
        const image = event.target.files[0]

        setPrimary(prev =>{
            return {image:image, url:""}
        })
    }
    const handleSecondary = (event)=>{
        let images = secondary
        let length = event.target.files.length
        
        for(let i=0; i<length; i++){
            images.push({
                image:event.target.files[i],
                url:""
            })
        }

        setSecondary([...images])
    }
    const uploadPrimary = async()=>{

        const formData = new FormData()
        formData.append('file', primary.image)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

        await axios.post('https://api.cloudinary.com/v1_1/vernon2021/image/upload', formData).then(async res => {
            console.log(res)
            const url = res.data.secure_url
            setPrimary(prev =>{
                return {...prev, url:url}
            })
        })
    }
    const uploadSecondary = async()=>{

        const formData = new FormData()
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

        await new Promise( (resolve,reject) => {
            secondary.map(async (item,idx)=>{
                formData.append('file', item.image)
                await axios.post('https://api.cloudinary.com/v1_1/vernon2021/image/upload', formData)
                .then(async res => {
                    console.log(res)
                    const url = res.data.secure_url
                    setSecondary(prev =>{
                        prev[idx].url = url
                        return prev
                    })
                    if(idx == secondary.length-1){
                        resolve()
                    }
                })
            })
        })

    }

    const handleSubmit = async()=>{
        await uploadPrimary()
        await uploadSecondary()

        console.log("After functions")
        console.log({primary, secondary})


    }

    return(
        <div>
            {/* Add a product name */}
            <div className={styles.name}>
                <p>Product Name</p>
                <input name="name" placeholder='Name' type="text"/>
            </div>
            {/* Add a product primary image */}
            <p>Choose Primary Image</p>
            <label className="file-upload">+ 
                <input className={styles.choose} onChange={handlePrimary} type="file" name="images"></input>
            </label>            
            {primary.image != "" &&
                <div>
                    <img className={styles.preview} src={URL.createObjectURL(primary.image)}/>  
                </div>
            }
            {/* Add product secondary images */}
            <p>Choose Secondary Images</p>
            <label className="file-upload">+ 
                <input className={styles.choose} onChange={handleSecondary} type="file" name="images" multiple></input>
            </label>
            {secondary.length > 0 &&
            secondary.map((item, index)=>(
                <div>
                    <img className={styles.preview} src={URL.createObjectURL(item.image)}/>  
                </div>
            ))
            }

            {/* Add product description */}
            <div className={styles.name}>
                <p>Product Description</p>
                <textarea placeholder='Description' type="text" name="description"/>
            </div>
            {/* Put in category */}
            {/* add tags */}
            <div className={styles.name}>
                <p>Tags</p>
                <input placeholder='Tags' type="text"/>
            </div>

            <button onClick={handleSubmit}>Add Listing</button>
        </div>
    )
}