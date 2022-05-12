import {useState, useEffect} from 'react'
import styles from 'styles/component/description.module.css'

export default function Description({confirm, confirmedDescription}){

    const[description, setDescription] = useState("")
    
    const handleChange=(e)=>{
        setDescription(e.target.value)
    }

    useEffect(()=>{
        setDescription(confirmedDescription)
    },[])

    
    return(
        <div className={styles.container}>
            <p className={styles.title}>Description</p>
            <p>Describe your shop briefly and try to give your potential customers a compelling reason as to why they should buy your products.</p>
            <textarea className={styles.value} placeholder="Description" value={description} onChange={handleChange}/>
            <button className={styles.save} onClick={()=>confirm(description)}>Save</button>
        </div>
    )

}