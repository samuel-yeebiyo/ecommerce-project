import styles from 'styles/profile/review.module.css'
import {useEffect, useContext, useState} from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { userContext } from '@/context/store'


export default function Review ({toggle, item, user, editing, show}){

    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    
    const {setLoading} = useContext(userContext)

    useEffect(()=>{
        console.log({item})
        console.log(editing)
        if(editing){
            setRating(item.rating)
            setTitle(item.title)
            setName(item.name)
            setDetails(item.description)
        }
    },[item])


    const router = useRouter()

    const rate = (num) =>{
        setRating(num)
    }
    const clear = () =>{
        setRating(0)
    }
    const handleSubmit = async() =>{

        setLoading(true)
        const {accessToken} = nookies.get()

        console.log("Submitting")
        await fetch(`http://localhost:8000/products/review/${item._id}/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'authorization': `Bearer ${accessToken}`
            },
            mode:'cors',
            body:JSON.stringify({
                rating:rating,
                description:details,
                title:title,
                name:name
            })
        }).then(async res => await res.json()).then(data => {
            setLoading(false)
            if(data.message == "Success"){
                router.reload()
            }
        })

    }

    const handleSave = async() =>{

        setLoading(true)
        const {accessToken} = nookies.get()

        console.log("Saving edit")
        await fetch(`http://localhost:8000/products/update/review/${item._id}/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'authorization': `Bearer ${accessToken}`
            },
            mode:'cors',
            body:JSON.stringify({
                rating:rating,
                description:details,
                title:title,
                name:name
            })
        }).then(async res=> await res.json()).then(data => {
            setLoading(false)
            if(data.message == "Success"){
                router.reload()
            }
        })

    }


    return(
        <div>{show && <>
            <span onClick={()=>{
                toggle()
            }}> Hide </span>
            <h2 className={styles.title}>Review Product</h2>
            <div className={styles.container}>
                <div className={styles.product}>
                    <div className={styles.image}>
                        {editing?
                            <img src={item.image}/>:
                            <img src={item.primary}/>
                        }
                    </div>
                    <div className={styles.rating}>
                        <p>{item.name}</p>
                        <div className={styles.stars}>
                            {Array.apply(null, Array(5)).map((item, idx)=>(
                                <span 
                                    className={idx+1 <= rating ? styles.filled_star : styles.star}
                                    onClick={()=>rate(idx+1)}
                                    />
                            ))
                            }
                            <span className={styles.clear} onClick={()=>clear()}>clear</span>
                        </div>
                    </div>
                </div>
                <div className={styles.review}>
                    <div>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title'/>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
                    </div>
                    <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder='Details'/>
                    <button onClick={() =>{
                        editing ? handleSave() : handleSubmit()
                    }}>Save</button>
                </div>
            </div>
        </>}</div>

    )

}