import {useState, useEffect} from 'react'

export default function nameshop({confirm, confirmedName}) {

    const [name, setName] = useState('')

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    useEffect(()=>{
        setName(confirmedName)
    },[])

  return (
    <div>
        <p>Name Shop</p>
        <input onChange={handleChange} value={name}  type="text"/>
        <button onClick={()=>{
            confirm(name)
        }}>Save</button>
    </div>
  )
}
