import {useState, useEffect} from 'react'

export default function Payment({confirm, confirmedKey}){

    const [key, setKey] = useState('')

    const handleChange=(e)=>{
        setKey(e.target.value)
    }

    useEffect(()=>{
        setKey(confirmedKey)
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

    return(
        <div style={styles.main}>
            <p style={styles.title}> Enter your public key</p>
            <input style={styles.input} onChange={handleChange} placeholder="Public Key" value={key} type='text'/>
            <button style={styles.button} onClick={()=>{
                confirm(key)
            }}>Save</button>
        </div>
    )
}