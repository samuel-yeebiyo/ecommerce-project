import styles from 'styles/component/listing.module.css'
import {useState, useEffect} from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'

export default function CreateListing ({shop, loading, editing}) {

    const [primary, setPrimary] = useState({
        image:"",
        url:""
    })
    const [secondary, setSecondary] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)


    useEffect(()=>{
        if(editing && Object.keys(editing).length > 0){
            setName(editing.name)
            setDescription(editing.desc)
            setPrice(editing.price)
            setPrimary(prev =>{
                return {image:"", url:editing.primary}
            })
            setSecondary(prev =>{
                let temp = []
                editing.secondary.map((item)=>{
                    temp.push({
                        image:"",
                        url:item
                    })
                })
                return temp
            })

            console.log(editing.secondary)
        }else{
            setName('')
            setDescription('')
            setPrice(0)
            setPrimary(prev =>{
                return {image:"", url:""}
            })
            setSecondary([])
        }

        console.log("Called on editing")
        console.log({editing})

    },[editing])


    const router = useRouter()

    const handlePrimary = (event)=>{
        const image = event.target.files[0]

        setPrimary(prev =>{
            return {image:image, url:""}
        })
    }
    const deletePrimary = ()=>{
        setPrimary(prev =>{
            return {image:"", url:""}
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
    const deleteSecondary=(idx)=>{
        setSecondary(prev =>{
            let temp = [...prev] 
            temp.splice(idx,1)
            return temp
        })
    }

    const uploadPrimary = async()=>{

        const formData = new FormData()
        if(primary.url == ""){
            formData.append('file', primary.image)
            formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

            await axios.post('https://api.cloudinary.com/v1_1/vernon2021/image/upload', formData).then(async res => {
                console.log(res)
                const url = res.data.secure_url
                setPrimary(prev =>{
                    prev.url = url
                    return prev
                })
            })
        }
    }
    const uploadSecondary = async()=>{

        const formData = new FormData()
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

        await new Promise( (resolve,reject) => {
            secondary.map(async (item,idx)=>{
                if(item.url == ""){
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
                }
                if(idx == secondary.length-1){
                    resolve()
                }
            })
        })

    }

    const handleSubmit = async()=>{
        loading()
        let shopId = await shop()
        await uploadPrimary()
        await uploadSecondary()

        await fetch('http://localhost:8000/products/add/', {
            method:'POST',
            headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            mode:'cors',
            body:JSON.stringify({
                id:shopId,
                name:name,
                price:price,
                desc:description,
                category:category,
                primary:primary.url,
                secondary:secondary.map((item)=>{
                    return item.url
                }),
                pathname:name.toLowerCase().replaceAll(" ","-")
            })
        }).then(res =>{
            router.reload()
        })


    }
    const handleSave = async()=>{
        loading()
        await uploadPrimary()
        await uploadSecondary()

        await fetch(`http://localhost:8000/products/update/${editing._id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            mode:'cors',
            body:JSON.stringify({
                name:name,
                price:price,
                desc:description,
                category:category,
                primary:primary.url,
                secondary:secondary.map((item)=>{
                    return item.url
                }),
                pathname:name.toLowerCase().replaceAll(" ","-")
            })
        }).then(res =>{
            router.reload()
        })
    }

    
    return(
        <div className={styles.listing_wrapper}>
            <div className={styles.left}>
                {/* Add a product name */}
                <div className={styles.name}>
                    <p>Product Name</p>
                    <input onChange={(e)=>{
                        setName(e.target.value)
                    }} value={name} name="name" placeholder='Name'  type="text"/>
                </div>
                {/* Add product description */}
                <div className={styles.name}>
                    <p>Product Description</p>
                    <textarea onChange={(e)=>{
                        setDescription(e.target.value)
                    }} value={description} placeholder='Description' type="text" name="description"/>
                </div>
                {/* Put in category */}
                {/* add tags */}
                <div className={styles.name}>
                    <p>Tags</p>
                    <input placeholder='Tags' type="text"/>
                </div>
            </div>
            
            <div className={styles.right}>
                 
                 
                 {/* Add a product primary image */}
                <p className={styles.title}>Choose Primary Image</p>
                <label className={styles.file_upload}>+ 
                    <input className={styles.choose} onChange={handlePrimary} type="file" name="images"></input>
                </label>            
                {primary.image != "" &&
                    <div className={styles.preview_container}>
                        <div className={styles.remove} onClick={()=>{
                            deletePrimary()
                        }}></div>
                        <img className={styles.preview} src={URL.createObjectURL(primary.image)}/>  
                    </div>
                }
                {primary.url != "" &&
                    <div className={styles.preview_container}>
                        <div className={styles.remove} onClick={()=>{
                            deletePrimary()
                        }}></div>
                        <img className={styles.preview} src={primary.url}/>  
                    </div>
                }



                {/* Add product secondary images */}
                <p className={styles.title}>Choose Secondary Images</p>
                <label className={styles.file_upload}>+ 
                    <input className={styles.choose} onChange={handleSecondary} type="file" name="images" multiple></input>
                </label>
                <div className={styles.secondary_grid}>
                    {editing && Object.keys(editing).length > 0 && secondary.length > 0 &&
                        secondary.map((item, idx)=>{
                            if(item.image == ""){ 
                                return <div className={styles.preview_container}>
                                    <div className={styles.remove} onClick={()=>{
                                        deleteSecondary(idx)
                                    }}></div>
                                    <img className={styles.preview} src={item.url}/>
                                </div>
                            }
                        })
                    }

                    {secondary.length > 0 &&
                    secondary.map((item, idx)=>{
                        if(item.url == ""){ 
                            return  <div className={styles.preview_container}>
                                <div className={styles.remove} onClick={()=>{
                                    deleteSecondary(idx)
                                }}></div>
                                <img className={styles.preview} src={URL.createObjectURL(item.image)}/>
                            </div>             
                        }       
                    })
                    }
                </div>


                {/* Add pricing */}
                <div className={styles.name}>
                    <p>Set Price</p>
                    <input onChange={(e)=>{
                        setPrice(e.target.value)
                    }} value={price} placeholder='0 SAMO' type="text"/>
                </div>
                {editing && Object.keys(editing).length > 0 ?    
                    <button onClick={handleSave}>Save</button>:
                    <button onClick={handleSubmit}>Add Listing</button>
                }
            </div>
        </div>
    )
}