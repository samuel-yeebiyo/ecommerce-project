import { withRouter } from 'next/router'
import {useState, useEffect} from 'react'

export default function nameshop({confirm, confirmedName}) {

    const [name, setName] = useState('')

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    useEffect(()=>{
        setName(confirmedName)
    },[])

    const styles = {
        main:{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center',
        },
        title:{
            marginBottom:'10px',
            fontSize:'20px',
        },
        input:{
            height:'30px',
            width:'250px',
            padding:"5px",
            marginBottom:'30px',
        },
        button:{
            border:'none',
            width:'100px',
            height:'30px'
        }
    }

  return (
    <div style={styles.main}>
        <p style={styles.title}>Name Shop</p>
        <input style={styles.input} onChange={handleChange} value={name} placeholder="Name" type="text"/>
        <button style={styles.button} onClick={()=>{
            confirm(name)
        }}>Save</button>
    </div>
  )
}
