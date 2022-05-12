import styles from '../../styles/modals/shipping.module.css'

import { useState, useEffect } from 'react'

export default function shipping({toggle, save, edit, update}){

    const [address, setAddress] = useState({
        first_name:"",
        last_name:"",
        country:"",
        street:"",
        city:"",
        phone_number:"",
        postal:""
    })

    useEffect(()=>{
        if(edit && Object.keys(edit).length > 0){
            setAddress({
                first_name:edit.first_name,
                last_name:edit.last_name,
                country:edit.country,
                street:edit.street,
                city:edit.city,
                phone_number:edit.phone_number,
                postal:edit.postal
            })
        }
    },[])

    return(
        <div className="modal_background">
            <div className={styles.card}>
                <div className={styles.top}>
                    <p className={styles.title}>Add Shipping Address</p>
                    <p onClick={toggle}>Cancel</p>
                </div>
                <div className={styles.form}>
                    <input placeholder='First Name' onChange={(e)=>{
                        setAddress(prev=>({...prev, first_name:e.target.value}))
                    }} value={address.first_name}/>
                    <input placeholder='Last Name' onChange={(e)=>{
                        setAddress(prev=>({...prev, last_name:e.target.value}))
                    }} value={address.last_name}/>
                    <input placeholder='Country' onChange={(e)=>{
                        setAddress(prev=>({...prev, country:e.target.value}))
                    }} value={address.country}/>
                    <input placeholder='Street Name' onChange={(e)=>{
                        setAddress(prev=>({...prev, street:e.target.value}))
                    }} value={address.street}/>
                    <input placeholder='City/State' onChange={(e)=>{
                        setAddress(prev=>({...prev, city:e.target.value}))
                    }} value={address.city}/>
                    <input placeholder='Phone Number' onChange={(e)=>{
                        setAddress(prev=>({...prev, phone_number:e.target.value}))
                    }} value={address.phone_number}/>
                    <input placeholder='Postal Code' onChange={(e)=>{
                        setAddress(prev=>({...prev, postal:e.target.value}))
                    }} value={address.postal}/>
                    <button onClick={()=>{
                        (edit && Object.keys(edit).length > 0) ? update(address, edit._id) : save(address)
                        toggle()
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}