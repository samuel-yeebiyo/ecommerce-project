import styles from 'styles/component/listing.module.css'
import {useState, useEffect, useContext} from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import { userContext } from '@/context/store'

export default function CreateListing ({shop, loading, editing, cookies}) {

    const [primary, setPrimary] = useState({
        image:"",
        url:""
    })
    const [secondary, setSecondary] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [price, setPrice] = useState(0)

    const {setLoading} = useContext(userContext)



    useEffect(()=>{
        if(editing && Object.keys(editing).length > 0){
            setName(editing.name)
            setDescription(editing.desc)
            setPrice(editing.price)
            setTags(editing.rawTags)
            setCategory(editing.category)
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
            setTags('')
            setCategory('')
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
        setLoading(true)
        let shopId = await shop()  //creates the shop and returns the id of the shop or just return id
        await uploadPrimary()
        await uploadSecondary()

        const {accessToken} = cookies
        await fetch('http://localhost:8000/products/add/', {
            method:'POST',
            headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': `Bearer ${accessToken}`
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
                pathname:name.toLowerCase().replaceAll(" ","-"),
                tags:tags
            })
        }).then(res =>{
            setLoading(false)
            router.replace('/myshop')
        })


    }
    const handleSave = async()=>{
        setLoading(true)
        await uploadPrimary()
        await uploadSecondary()

        const {accessToken} = cookies
        await fetch(`http://localhost:8000/products/update/${editing._id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'authorization': `Bearer ${accessToken}`
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
                pathname:name.toLowerCase().replaceAll(" ","-"),
                tags:tags
            })
        }).then(res =>{
            setLoading(false)
            router.reload()
        })
    }

    
    return(
        <div className={styles.listing_wrapper}>
            
            <div className={styles.right}>
                 
                {/* Add a product name */}
                <div className={styles.name}>
                    <p>Product Name</p>
                    <input onChange={(e)=>{
                        setName(e.target.value)
                    }} value={name} name="name" placeholder='Name'  type="text"/>
                </div>
                 
                 {/* Add a product primary image */}
                <p className={styles.title}>Choose Primary Image</p>
                {(primary.image == "" && primary.url == "") &&
                    <label className={styles.file_upload}>+ 
                        <input className={styles.choose} onChange={handlePrimary} type="file" name="images"></input>
                    </label>
                }            
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


            </div>

            <div className={styles.left}>
                {/* Add product description */}
                <div className={styles.name}>
                    <p>Product Description</p>
                    <textarea onChange={(e)=>{
                        setDescription(e.target.value)
                    }} value={description} placeholder='Description' type="text" name="description"/>
                </div>

                {/* Add a category */}
                <div className={styles.name}>
                    <p>Choose Category</p>
                     <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option>-- Category</option>
                        <option>Accessories</option>
                        <option>Books</option>
                        <option>Digital</option>
                        <option>Home</option>
                        <option>Kitchen</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Add pricing */}
                <div className={styles.name}>
                    <p>Set Price</p>
                    <input onChange={(e)=>{
                        setPrice(e.target.value)
                    }} value={price} placeholder='0 SAMO' type="text"/>
                </div>
                <div className={styles.name}>
                    <p>Tags</p>
                    <p>separate by commas and a space</p>
                    <input placeholder='Tags' type="text" onChange={(e)=> setTags(e.target.value)} value={tags}/>
                </div>
            </div>
                {editing && Object.keys(editing).length > 0 ?    
                    <button onClick={handleSave}>Save</button>:
                    <button onClick={handleSubmit}>Add Listing</button>
                }
        </div>
    )
}