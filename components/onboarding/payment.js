import {useState, useEffect} from 'react'

export default function Payment({confirm, confirmedKey}){

    const [key, setKey] = useState('')

    const handleChange=(e)=>{
        setKey(e.target.value)
    }

    useEffect(()=>{
        setKey(confirmedKey)
    },[])

    return(
        <div>
            <p>Enter your public key</p>
            <input onChange={handleChange} value={key} type='text'/>
            <button onClick={()=>{
                confirm(key)
            }}>Save</button>
        </div>
    )
}